import React from 'react';
import { Provider } from 'react-redux';
import { StoreCounter } from './storeCounter';
import styles from '../../css/blueStyles.css';
import {BlueInnerContainer} from './blueInnerComponent';
import { getModuleContainer } from 'microservices-helper/module_helper';

const ModuleContainer = getModuleContainer(React, Provider)

export class BlueContainer extends React.Component {
    render() {
        return <ModuleContainer viewId={this.props.viewId} store={this.props.store} type="blue" title="Blue tab" >
            <div id="blue-content">
                <h3>[React, not in iframe, no angular bootstrap] </h3><h2>This is Blue content (ID: {this.props.viewId})</h2>
                <BlueInnerContainer/>
                <StoreCounter/>
            </div>
        </ModuleContainer>;
    }
}
