import React from 'react';
import { StoreCounter } from './storeCounter';
import styles from '../../css/blueStyles.css';
import {BlueInnerContainer} from './blueInnerComponent';
import { moduleContainer } from 'microservices-helper/module_helper';
import { dispatch } from '../store/store';

class BlueContainerDefinition extends React.Component {
    render() {
        return <div id="blue-content">
                <h2>[React] This is Blue content (ID: {this.props.viewId})</h2>
                <BlueInnerContainer/>
                <StoreCounter/>
            </div>;
    }
}

export const BlueContainer = moduleContainer(BlueContainerDefinition, {type: 'blue', title: 'Blue tab' });
