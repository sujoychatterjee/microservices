import { moduleContainer } from "microservices-helper/module_helper";
import React from 'react';

class YellowContainerDefinition extends React.Component {
    render() {
        return <div id="yellow-content"><h3>This is Yellow content</h3></div>;
    }
}

export const YellowContainer = moduleContainer(YellowContainerDefinition, { type: 'yellow', title: 'Yellow tab'});
