import React from 'react';
import ReactDOM from 'react-dom';
import { Frame } from '../../../../../../react/components/frame';
import { StoreCounter } from './storeCounter';
import { AngularBootstrapper } from './angularBootstrapper';

export class GreenContainer extends React.Component {

    constructor() {
        super();
        this.state = {};
    }

    render() {
        // return <div id="green-content">
        //     <h3>This is Green content (ID: {this.props.viewId})</h3>
        //     <StoreCounter />
        // </div>;
        return <Frame setroot={this.setRoot.bind(this)}>
            <div id="green-content">
                <AngularBootstrapper root={this.state.rootElement}  content={<green-component view-id={this.props.viewId}/>}/>
            </div>
        </Frame>;
    }

    setRoot(root) {
        this.setState({
            rootElement: root,
        });
    }
}