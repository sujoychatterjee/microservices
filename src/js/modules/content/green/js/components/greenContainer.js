import React from 'react';
import { Frame } from '../../../../../../react/components/frame';
import { AngularBootstrapper } from './angularBootstrapper';
import '../modules/greenModule';
import { setStore } from '../store/store';
import styles from '../../css/greenStyles.css';

export class GreenContainer extends React.Component {
    constructor(props) {
        super(props);
        setStore(props.store);
        props.store.dispatch({
            type: 'add_tab',
            payload: {id: this.viewId, details: { title: 'Green tab', name: 'green'}, params: { viewId: props.viewId } },
        });
    }
    render() {
        const bindings = {
            viewId: this.props.viewId,
            services: this.props.services,
        }
        return <div id="green-content">
                <AngularBootstrapper moduleName='greenModule' componentName='greenComponent' bindings={bindings}/>
            </div>;
    }
}