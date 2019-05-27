import reducerRegistry from '../../store/reducers/reducerRegistery';
import { store } from '../../store/stateStore';
import { epic$ } from '../../store/epics/epicRegistery';
import { combineEpics } from 'redux-observable';
export class ContentMananger {
    
    constructor(triggerHandler, $transitions) {
        this.content = [];
        this.delayQueue = [];
        this.triggerHandler = triggerHandler;
        this.$transitions = $transitions;
    }

    initialize($stateProvider) {
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
            params: contentData.params,
          };
        const storeDefs = contentData.store;
        const epicDefs = contentData.epics;
        const outbound$ = contentData.triggerHelpers ? contentData.triggerHelpers.outbound : undefined;
        if (this.$stateProvider) {
        const storeDef = contentData.store;
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
            if (params.store === null) {
                params = { ...params, store };
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
}

ContentMananger.$inject = ['triggerHandler', '$transitions'];
