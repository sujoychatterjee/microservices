import React from 'react';
import ReactDOM from 'react-dom';
import { Frame } from '../../../../../../react/components/frame';
import { AngularBootstrapper } from './angularBootstrapper';

export class GreenContainer extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        const bindings = {
            viewId: this.props.viewId,
            services: this.props.services,
        }
        return <Frame>
            <div id="green-content">
                <AngularBootstrapper moduleName='greenModule' componentName='greenComponent' bindings={bindings}/>
            </div>
        </Frame>;
    }
}