import reducerRegistry from '../../store/reducers/reducerRegistery';
export class ContentMananger {
    
    constructor(triggerHandler) {
        this.content = [];
        this.delayQueue = [];
        this.triggerHandler = triggerHandler;
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
          };
        const storeDefs = contentData.store;
        const outbound$ = contentData.triggerHelpers ? contentData.triggerHelpers.outbound : undefined;
        if (this.$stateProvider) {
        const storeDef = contentData.store;
            this.register({stateDefinition, storeDefs, outbound$});
        } else {
            this.delayQueue = [...this.delayQueue, {stateDefinition, storeDefs, outbound$}]
        }
    }

    register({stateDefinition, storeDefs, outbound$}) {
        this.registerState(stateDefinition);
        this.registerTrigger(outbound$);
        if (storeDefs) {
            this.registerReducers(storeDefs);
        }
    }

    registerReducers(storeDefs) {
        storeDefs.forEach((storeDef) => {
            const {name, initialState, reducers} = storeDef;
            reducerRegistry.register(name, initialState, reducers);
        });
    }

    registerState(stateDefinition) {
        this.$stateProvider.state(stateDefinition);
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

ContentMananger.$inject = ['triggerHandler'];
