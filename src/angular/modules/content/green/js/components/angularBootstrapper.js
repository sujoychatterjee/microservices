import React from 'react';
import * as angular from 'angular';
import '../modules/greenModule';

export class AngularBootstrapper extends React.Component {
    render() {
        return this.props.content;
    }

    componentDidMount() {
        angular.bootstrap(this.props.root, ['greenModule'], {
            strictDi: true,
        });
    }
}