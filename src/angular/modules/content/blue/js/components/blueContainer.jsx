import React from 'react';
import { Frame } from '../../../../../../react/components/frame';
import { StoreCounter } from './storeCounter';

export class BlueContainer extends React.Component {
    render() {
        return <div id="blue-content">
            <h3>This is Blue content</h3>
            <StoreCounter />
        </div>;
        // return <Frame>
        //     <div id="blue-content">
        //         <h3>This is Blue content</h3>
        //         <StoreCounter />
        //     </div>
        // </Frame>;
    }
}