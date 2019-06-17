import { getModuleContainer } from "microservices-helper/module_helper";
import React from 'react';

const ModuleContainer = getModuleContainer(React);

export class YellowContainer extends React.Component {
    render() {
        return <ModuleContainer viewId={this.props.viewId} store={this.props.store} type='yellow' title='Yellow tab'>
            <div id="yellow-content"><h3>This is Yellow content</h3></div>
        </ModuleContainer>;
    }
}
