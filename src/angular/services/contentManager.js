export class ContentMananger {
    
    constructor() {
        this.content = [];
        this.delayQueue = [];
    }

    initialize($stateProvider) {
        this.$stateProvider = $stateProvider;
        this.registerDelayed();
    }

    registerContent(contentData) {
        this.content = [...this.content, contentData];
        this.tryRegisterState(contentData);
    }

    tryRegisterState(contentData) {
        const stateDefinition = {
            name: contentData.name,
            url: `/${contentData.name}`,
            template: contentData.template,
          };
        if (this.$stateProvider) {
            this.registerState(stateDefinition);
        } else {
            this.delayQueue = [...this.delayQueue, stateDefinition]
        }
    }

    registerState(stateDefinition) {
        this.$stateProvider.state(stateDefinition);
    }

    registerDelayed() {
        const registerState = this.registerState.bind(this);
        this.delayQueue.forEach(registerState);
    }

    deregisterContent(type) {
        this.content = this.content.filter(contentData => contentData.type !== type);
    }

    getManager(type) {
        const typeContentData = this.content.find((contentData) => contentData.name === type) || {};
        return typeContentData.manager;
    }
}

ContentMananger.$inject = [];
