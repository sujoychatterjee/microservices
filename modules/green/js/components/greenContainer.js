import React from 'react';
import { getAngularBootstrapperComponent } from 'microservices-helper/module_helper';
import * as angular from 'angular';
import '../modules/greenModule';
import styles from '../../css/greenStyles.css';
import { moduleContainer } from 'microservices-helper/module_helper';

const AngularBootstrapper = getAngularBootstrapperComponent(React, angular);

class GreenContainerDefinition extends React.Component {
    render() {
        const { viewId, services } = this.props;
        const bindings = {
            viewId,
            services,
        };
        return <div id="green-content">
                <AngularBootstrapper moduleName='greenModule' componentName='greenComponent' bindings={bindings}/>
            </div>;
    }
}

export const GreenContainer = moduleContainer(GreenContainerDefinition, {type: 'green', title: 'Green tab'});