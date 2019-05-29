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
        return <Frame setRoot={this.setRoot.bind(this)}>
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