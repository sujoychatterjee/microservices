import React from 'react';
import { getAngularBootstrapperComponent, getModuleContainer } from 'microservices-helper/module_helper';
import * as angular from 'angular';
import '../modules/greenModule';
import styles from '../../css/greenStyles.css';

const ModuleContainer = getModuleContainer(React);
const AngularBootstrapper = getAngularBootstrapperComponent(React, angular);

export class GreenContainer extends React.Component {
    render() {
        const { viewId, services } = this.props;
        const bindings = {
            viewId,
            services,
        };
        return  <ModuleContainer viewId={this.props.viewId} store={this.props.store} type='green' title='Green tab'>
            <div id="green-content">
                <AngularBootstrapper moduleName='greenModule' componentName='greenComponent' bindings={bindings}/>
            </div>
        </ModuleContainer>;
    }
}
