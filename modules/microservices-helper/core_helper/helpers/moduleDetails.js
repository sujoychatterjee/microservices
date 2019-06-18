import { moduleOptions } from '../../module_helper/helpers/registerModuleHelper';
import { getParams } from '../utils/paramsUtil';
import { react2angular } from "react2angular";
import { getFrameWrapper } from "./frameWrapperHelper";

export function getModuleComponents() {
    return moduleOptions.map((options) => {
        const shouldAddFrame = options.frameIsolation;
        const reactComponent = shouldAddFrame ? getFrameWrapper(options.component) : options.component;
        const requestedProps = Object.keys(getParams(options.params));
        const props = shouldAddFrame ? [...requestedProps, 'htmlLink'] : requestedProps;
        return {
            name: options.componentName,
            value: react2angular(reactComponent, props),
        }
    });
}

export function getModuleRegisterOptions() {
    return moduleOptions.map((options) => {
        const { params: passedParams } = options;
        const params = getParams(passedParams);
        return {
            ...options,
            params,
            controller: getController(params, options.name),
            template: getTemplate(options.componentName, params),
        }
    });
}

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
