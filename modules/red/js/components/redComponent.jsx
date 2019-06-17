import React from 'react';
import { getModuleContainer } from 'microservices-helper/module_helper';
import { dispatch } from '../redModule';

const ModuleContainer = getModuleContainer(React);

const redBackboneView = require('../backboneViews/redView');

export class RedComponent extends React.Component {

    constructor(props) {
        super(props);
        this.redBackboneElementRef = React.createRef();
    }


    render() {
        return <ModuleContainer viewId={this.props.viewId} store={this.props.store} type='red' title='Red Tab'>
            <div id="backbone-container" ref={this.redBackboneElementRef}></div>;
        </ModuleContainer>;
    }

    componentDidMount() {
        new redBackboneView({
            el: this.redBackboneElementRef.current,
            id: this.props.viewId,
            model: {},
            dispatch,
        });
    }
}
