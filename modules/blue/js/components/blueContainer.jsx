import React from 'react';
import { StoreCounter } from './storeCounter';
import styles from '../../css/blueStyles.css';
import { setStore } from '../utils/connectWrapper';
import {BlueInnerContainer} from './blueInnerComponent';

export class BlueContainer extends React.Component {

    constructor(props) {
        super(props);
        setStore(props.store);
        props.store.dispatch({
            type: 'add_tab',
            payload: {id: this.viewId, details: { title: 'Blue tab', name: 'blue'}, params: { viewId: props.viewId } },
        });
    }
    render() {
        return <div id="blue-content">
                <h2>This is Blue content (ID: {this.props.viewId})</h2>
                <BlueInnerContainer/>
                <StoreCounter/>
            </div>;
    }
}