import React from 'react';
import { Frame } from '../../../../../../react/components/frame';
import { StoreCounter } from './storeCounter';
import styles from '../../css/blueStyles.css';

export class BlueContainer extends React.Component {
    getStyleComponent() {
        return (
            <style>{styles}</style>
        );
    }

    render() {
        return (
            <Frame head={this.getStyleComponent()}>
                <div id="blue-content">
                    <h2>This is Blue content (ID: {this.props.viewId})</h2>
                    <StoreCounter/>
                </div>
            </Frame>
        )
    }
}