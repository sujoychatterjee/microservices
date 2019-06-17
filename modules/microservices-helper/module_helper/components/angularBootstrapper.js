import React from 'react';
import * as angular from 'angular';

export function getAngularBootstrapperComponent(React, angular) {

    return class AngularBootstrapper extends React.Component {
        render() {
            return <div className="angular-wrapper" ref={(node) => this.node = node}></div>;
        }

        getServices() {
            var elem = angular.element(this.node);
            var injector = elem.injector();
            return {
                $rootScope: injector.get('$rootScope'),
                $compile: injector.get('$compile'),
            }
        }
        componentDidMount() {
            angular.bootstrap(this.node, [this.props.moduleName], {
                strictDi: true,
            });
            const { $rootScope, $compile } = this.getServices();
            const scope = this.getScope($rootScope);
            const element = this.createElement();
            this.compile($compile, element, scope)
            
        }

        getScope($rootScope) {
            const newScope = $rootScope.$new();
            Object.entries(this.props.bindings).forEach(([key, value]) => {
                newScope[key] = value;
            });
            return newScope;
        }
        
        createElement() {
            const document = this.node.ownerDocument;
            const ele = document.createElement(this.hyphenate(this.props.componentName));
            Object.keys(this.props.bindings).forEach((key) => {
                ele.setAttribute(this.hyphenate(key), key);
            });
            this.node.appendChild(ele);
            return ele;
        }

        compile($compile, el, scope) {
            var ret = $compile(el)(scope);
            scope.$apply();
        
            return ret;
        }

        hyphenate(string) {
            return string.replace(/([a-z])([A-Z0-9])/g, (_, b, c) =>
            [b, c].join('-').toLowerCase(),
            );
        }
    }
}
