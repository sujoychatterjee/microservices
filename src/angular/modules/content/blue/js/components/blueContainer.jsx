import React from 'react';
import { Frame } from '../../../../../../react/components/frame';
import { StoreCounter } from './storeCounter';

export class BlueContainer extends React.Component {
    render() {
        return <Frame>
            <div id="blue-content">
                <h2>This is Blue content (ID: {this.props.viewId})</h2>
                <StoreCounter />
            </div>
        </Frame>;
    }
}