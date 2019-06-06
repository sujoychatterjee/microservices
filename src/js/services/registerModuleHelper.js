import { react2angular } from "react2angular";
import { getReactWrapper } from "../helpers/reactWrapperHelper";

function getController(params, name) {
    class ModuleAngularController {

        constructor($state) {
            this.$state = $state;
            Object.keys(params).forEach((param) => {
                this[param] = this.$state.params[param];
            });
            this.htmlLink = `/${name}.html`;
        }
    }

    ModuleAngularController.$inject = ['$state'];

    return ModuleAngularController;
}

function getTemplate(name, params) {
    const paramNames = Object.keys(params);
    const paramsString = paramNames.reduce((paramsString, paramName) => `${paramsString} html-link="vm.htmlLink" ${hyphenate(paramName)}="vm.${paramName}"`, '');
    return `<${hyphenate(name)} ${paramsString} />`;
}

function hyphenate(string) {
    return string.replace(/([a-z])([A-Z0-9])/g, (_, b, c) =>
      [b, c].join('-').toLowerCase(),
    );
}

class RegisterModuleHelper {
    constructor() {
        this.moduleOptions = [];
    }

    registerModule(options) {
        this.moduleOptions.push(options);
    }

    getComponents() {
        return this.moduleOptions.map((options) => {
            return {
                name: options.componentName,
                value: react2angular(getReactWrapper(options.component), [...Object.keys(options.params), 'htmlLink']),
            }
        });
    }

    getModuleOptions() {
        return this.moduleOptions.map((options) => ({
            ...options,
            controller: getController(options.params, options.name),
            template: getTemplate(options.componentName, options.params),
        }));
    }
}

export const registerModuleHelper = new RegisterModuleHelper();
