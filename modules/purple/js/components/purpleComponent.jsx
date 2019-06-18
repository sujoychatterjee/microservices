import React from 'react';
import { getAngularRendererComponent } from 'microservices-helper/module_helper';
import { angular } from './purpleContainer';

export class PurpleComponent extends React.Component {

    constructor(props) {
        super(props);
        this.AngularRenderer = getAngularRendererComponent(React, angular);
    }

    render() {
        const AngularRenderer = this.AngularRenderer;
        const content = AngularRenderer ? <AngularRenderer componentName='purpleInnerComponent'></AngularRenderer> : undefined;
        return <div id="purple-content"><h3>[React, no iframe, no angular bootstrap]</h3><h2>This is Purple content (ID: {this.props.id})</h2>
            {content}
        </div>;
    }
}