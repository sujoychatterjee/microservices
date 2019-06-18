export function getAngularRendererComponent(React, angular) {
    return class AngularRenderer extends React.Component {
        constructor() {
            super();
            this.renderRef = React.createRef();
        }

        render() {
            return <div ref={this.renderRef}></div>;
        }

        componentDidMount() {
            const rendered = this.renderAngularElement();
            if (!rendered) {
                setTimeout(() => {
                    this.renderAngularElement()
                });
            }
        }

        renderAngularElement() {
            const renderNode = this.renderRef.current;
            const documentElement = renderNode.ownerDocument;
            const bootstrapElement = documentElement.getElementById('angular-bootstrap-element');
            const { $rootScope, $compile, $timeout } = this.getServices(bootstrapElement);

            if(!$rootScope) {
                return false;
            }

            const scope = this.getScope($rootScope);
            const element = this.createElement(renderNode, documentElement);
            this.compile($compile, element, scope, $timeout);
            return true;
        }

        getServices(bootstrapElement) {
            var elem = angular.element(bootstrapElement);
            var injector = elem.injector();
            return injector ? {
                $timeout: injector.get('$timeout'),
                $rootScope: injector.get('$rootScope'),
                $compile: injector.get('$compile'),
            } : {};
        }

        getScope($rootScope) {
            const newScope = $rootScope.$new();
            Object.entries(this.props.bindings || []).forEach(([key, value]) => {
                newScope[key] = value;
            });
            return newScope;
        }
        
        createElement(renderNode, documentElement) {
            const ele = documentElement.createElement(this.hyphenate(this.props.componentName));
            Object.keys(this.props.bindings || []).forEach((key) => {
                ele.setAttribute(this.hyphenate(key), key);
            });
            renderNode.appendChild(ele);
            return ele;
        }

        compile($compile, el, scope, $timeout) {
            var ret = $compile(el)(scope);
            $timeout(() => {
                scope.$apply();
            });
            return ret;
        }

        hyphenate(string) {
            return string.replace(/([a-z])([A-Z0-9])/g, (_, b, c) =>
            [b, c].join('-').toLowerCase(),
            );
        }
    }
}