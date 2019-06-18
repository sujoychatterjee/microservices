export function getAngularBootstrapperComponent(React, angular) {

    return class AngularBootstrapper extends React.Component {
        render() {
            return <div id="angular-bootstrap-element" ref={(node) => this.node = node}>
                {this.props.children}
            </div>;
        }
        componentDidMount() {
            angular.bootstrap(this.node, [this.props.moduleName], {
                strictDi: true,
            });
        }
    }
}
