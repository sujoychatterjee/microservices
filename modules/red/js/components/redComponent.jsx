import React from 'react';
import { moduleContainer } from 'microservices-helper/module_helper';
import { dispatch } from '../redModule';

const redBackboneView = require('../backboneViews/redView');

class RedComponentDefinition extends React.Component {

    constructor(props) {
        super(props);
        this.redBackboneElementRef = React.createRef();
    }


    render() {
        return <div id="backbone-container" ref={this.redBackboneElementRef}></div>;
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

export const RedComponent = moduleContainer(RedComponentDefinition, { type: 'red', title: 'Red Tab' });
