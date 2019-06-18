import { getModuleContainer, getAngularBootstrapperComponent } from "microservices-helper/module_helper";
import React from 'react';
import { PurpleComponent } from "./purpleComponent";

const ModuleContainer = getModuleContainer(React);

export let angular;

export class PurpleContainer extends React.Component {
    constructor(props) {
        super(props);
        angular = props.angular;
    }

    render() {
        return <ModuleContainer viewId={this.props.viewId} store={this.props.store} type='purple' title='Purple tab'>
            <PurpleComponent id={this.props.viewId}></PurpleComponent>
        </ModuleContainer>;
    }
}
