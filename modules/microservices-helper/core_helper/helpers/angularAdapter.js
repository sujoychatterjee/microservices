import { Subject } from 'rxjs';

import { getModuleComponents, getModuleRegisterOptions } from './moduleDetails';
import { DispatchHandler } from './dispatchHandler';

export let dispatch;
export let executeModuleFunctionality;
export let getContent;

function getContentManagerService(injectedServices, storeDetails, handlerServiceName) {

    const { store, epic$, reducerRegistry, combineEpics } = storeDetails;

    class ContentMananger {
        
        constructor(customHandler, $transitions, ...injectedServices) {
            this.injectedServices = injectedServices;
            this.content = [];
            this.delayQueue = [];
            this.$transitions = $transitions;

            this.dispatchHandler = new DispatchHandler(customHandler.customHandlers, store);

            this.dispatchHandler.outbound$.subscribe(this.sendTrigger.bind(this));
        }

        initialize($stateProvider) { 
            dispatch = this.dispatch.bind(this);
            executeModuleFunctionality = this.execute.bind(this);
            getContent = this.getContent.bind(this);
            this.$stateProvider = $stateProvider;
            this.registerDelayed();
        }

        registerContent(contentData) {
            this.content = [...this.content, contentData];
            this.tryRegister(contentData);
        }

        tryRegister(contentData) {
            const { store: storeDefs, epics: epicDefs, dispatchHandler, routeName: name, url, template, controller, params } = contentData;
            const outbound$ = dispatchHandler ? dispatchHandler.outbound$ : undefined;
            const stateDefinition = {
                name,
                url,
                template,
                controller,
                controllerAs: 'vm',
                params,
            };
            if (this.$stateProvider) {
                this.register({stateDefinition, storeDefs, epicDefs, outbound$});
            } else {
                this.delayQueue = [...this.delayQueue, {stateDefinition, storeDefs, epicDefs, outbound$}]
            }
        }

        register({stateDefinition, storeDefs, epicDefs, outbound$}) {
            this.registerState(stateDefinition);
            this.registerTrigger(outbound$);
            if (storeDefs) {
                this.registerReducers(storeDefs);
            }
            if (epicDefs) {
                this.registerEpics(epicDefs);
            }
        }

        registerReducers(storeDefs) {
            storeDefs.forEach((storeDef) => {
                const {name, initialState, reducers} = storeDef;
                reducerRegistry.register(name, initialState, reducers);
            });
        }

        registerEpics(epicDefs) {
            epic$.next(combineEpics(...epicDefs));
        }

        registerState(stateDefinition) {
            this.$stateProvider.state(stateDefinition);
            this.$transitions.onBefore({ to: '**' }, (trans) => {
                let params = trans.params();
                let newTrans = true;
                const services = injectedServices.reduce((servicesObj, serviceName, index) => ({...servicesObj, [serviceName]: this.injectedServices[index]}), {});
                if (params.store === null) {
                    params = { ...params, store, services };
                    newTrans = trans.router.stateService.target(trans.to(), params);
                }
                return newTrans;
            });
        }

        registerTrigger(moduleOutbound$) {
            if (moduleOutbound$) {
                this.dispatchHandler.addNewModuleSubscription(moduleOutbound$);
            }
        }

        registerDelayed() {
            const register = this.register.bind(this);
            this.delayQueue.forEach(register);
        }

        deregisterContent(type) {
            this.content = this.content.filter(contentData => contentData.type !== type);
        }
        
        getContent(type) {
            return this.content.find((contentData) => contentData.name === type);
        }

        dispatch(action, to) {
            this.sendTrigger({action, to});
        }

        sendTrigger({ action, to }) {
            const content = to ? this.getContent(to) : undefined;
            if (content && content.dispatchHandler && content.dispatchHandler.inbound$) {
                content.dispatchHandler.inbound$.next(action);
            }
        }

        execute(type, functionName) {
            const content = this.getContent(type);
            if (content && content.functionality && content.functionality[functionName]) {
                return (...args) => {
                    return content.functionality[functionName](...args);
                }
            }
        }
    }

    ContentMananger.$inject = [handlerServiceName, '$transitions', ...injectedServices];

    return ContentMananger;
}

export function initializeModules(angularModule, handlerServiceName, injectedServices, storeDetails) {
    let  $stateProviderSaved;
    const moduleComponents = getModuleComponents();
    const moduleOptions = getModuleRegisterOptions();

    angularModule.service('contentManager', getContentManagerService(injectedServices, storeDetails, handlerServiceName));

    angularModule.config(['$stateProvider', ($stateProvider) => {
        $stateProviderSaved = $stateProvider;
    }]);

    angularModule.run(['contentManager', (contentManager) => {
        contentManager.initialize($stateProviderSaved);

        moduleOptions.forEach((options) => {
            contentManager.registerContent(options);
        });
    }]);

    moduleComponents.forEach((component) => {
        angularModule.component(component.name, component.value);
    });
}
