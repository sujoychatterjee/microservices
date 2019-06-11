import React from 'react';
import { moduleContainer } from 'microservices-helper/module_helper';

class RedComponentDefinition extends React.Component {
    render() {
        return <div id="red-content"><h3>This is Red content</h3></div>;
    }
}

export const RedComponent = moduleContainer(RedComponentDefinition, { type: 'red', title: 'Red Tab' });
