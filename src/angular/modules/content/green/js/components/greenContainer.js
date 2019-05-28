import React from 'react';
import { Frame } from '../../../../../../react/components/frame';
import { StoreCounter } from './storeCounter';

export class GreenContainer extends React.Component {
    render() {
        // return <div id="green-content">
        //     <h3>This is Green content (ID: {this.props.viewId})</h3>
        //     <StoreCounter />
        // </div>;
        return <Frame>
            <div id="green-content">
                <h3>This is Green content (ID: {this.props.viewId})</h3>
                <StoreCounter />
            </div>
        </Frame>;
    }
}