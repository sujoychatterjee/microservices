import { DispatchHandler } from "./dispatchHandler";

class RegisterModuleHelper {
    constructor() {
        this.moduleOptions = [];
        this.registerModule = this.registerModule.bind(this);
        this.getDispatch = this.getDispatch.bind(this);
        
    }

    registerModule(options) {
        const { customDispatchHandlers, name } = options;
        const dispatchHandler = new DispatchHandler(name, customDispatchHandlers);
        this.moduleOptions.push({...options, dispatchHandler});
        return dispatchHandler.dispatch;
    }

    getDispatch(type) {
        return this.moduleOptions.find(({name}) => type === name).dispatchHandler.dispatch;
    }
}

const registerModuleHelper = new RegisterModuleHelper();
export const { moduleOptions, registerModule, getDispatch } = registerModuleHelper;
