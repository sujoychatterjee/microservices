import { getModuleContainer, getAngularBootstrapperComponent } from "microservices-helper/module_helper";
import React from 'react';
import * as angular from 'angular';
import '../modules/yellowModule';
import { YellowComponent } from "./yellowComponent";

const AngularBootstrapper = getAngularBootstrapperComponent(React, angular);

const ModuleContainer = getModuleContainer(React);

export class YellowContainer extends React.Component {
    render() {
        return <ModuleContainer viewId={this.props.viewId} store={this.props.store} type='yellow' title='Yellow tab'>
            <AngularBootstrapper moduleName='yellowModule'>
                <YellowComponent id={this.props.viewId}></YellowComponent>
            </AngularBootstrapper>
        </ModuleContainer>;
    }
}
