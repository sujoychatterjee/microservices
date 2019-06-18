import React from 'react';
import * as angular from 'angular';
import { getAngularRendererComponent } from 'microservices-helper/module_helper';

const AngularRenderer = getAngularRendererComponent(React, angular);

export class YellowComponent extends React.Component {
    render() {
        return <div id="yellow-content"><h3>[React, in iframe, has its own angular bootstrap]</h3><h2>This is Yellow content (ID: {this.props.id})</h2>
            <AngularRenderer componentName='yellowInnerComponent'></AngularRenderer>
        </div>;
    }
}