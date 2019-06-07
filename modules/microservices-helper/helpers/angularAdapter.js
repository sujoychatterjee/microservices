import { getParams } from '../utils/paramsUtil';

import { getComponents, getModuleOptions } from './registerModuleHelper';

export let sendModuleTrigger;
export let executeModuleFunctionality;
export let getContent;

function getContentManagerService(injectedServices, storeDetails) {

    const { store, epic$, reducerRegistry, combineEpics } = storeDetails;

    class ContentMananger {
        
        constructor(triggerHandler, $transitions, ...injectedServices) {
            this.injectedServices = injectedServices;
            this.content = [];
            this.delayQueue = [];
            this.triggerHandler = triggerHandler;
            this.$transitions = $transitions;
        }

        initialize($stateProvider) {
            sendModuleTrigger = this.sendTrigger.bind(this);
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
            const stateDefinition = {
                name: contentData.routeName,
                url: contentData.url,
                template: contentData.template,
                controller: contentData.controller,
                controllerAs: 'vm',
                params: getParams(contentData.params),
            };
            const storeDefs = contentData.store;
            const epicDefs = contentData.epics;
            const outbound$ = contentData.triggerHelpers ? contentData.triggerHelpers.outbound : undefined;
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

        registerTrigger(outbound$) {
            if (outbound$) {
                outbound$.subscribe(this.triggerHandler.onTrigger.bind(this.triggerHandler));
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

        sendTrigger(type, trigger) {
            const content = this.getContent(type);
            if (content && content.triggerHelpers && content.triggerHelpers.inbound) {
                content.triggerHelpers.inbound.next(trigger);
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

    ContentMananger.$inject = ['triggerHandler', '$transitions', ...injectedServices];

    return ContentMananger;
}

export function initializeModules(angularModule, TriggerHandlerService, injectedServices, storeDetails) {
    let  $stateProviderSaved;
    const moduleComponents = getComponents();
    const moduleOptions = getModuleOptions();

    angularModule.service('contentManager', getContentManagerService(injectedServices, storeDetails));
    angularModule.service('triggerHandler', TriggerHandlerService);

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
