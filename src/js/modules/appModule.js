import * as angular from 'angular';
import '@uirouter/angularjs';
import './basicModule';
import '../modules/content';
import { RootApp } from '../components/rootApp';
import { ContentMananger } from '../services/contentManager';
import { TriggerHandlerService } from '../services/triggerHanderService';

// -----------------------
import 'blue';
import 'green';
// -----------------------

import { getComponents, getModuleOptions } from 'microservices-helper';

const moduleComponents = getComponents();
const moduleOptions = getModuleOptions();

let $stateProviderSaved;

const app = angular.module('app', ['ui.router', 'app.basic', 'app.red', 'app.yellow']);

app.config(['$stateProvider', ($stateProvider) => {
    $stateProviderSaved = $stateProvider;
}]);

app.run(['contentManager', (contentMananger) => {
    contentMananger.initialize($stateProviderSaved);

    moduleOptions.forEach((options) => {
        contentMananger.registerContent(options);
    });
}]);

app.component('rootApp', RootApp);
app.service('contentManager', ContentMananger);
app.service('triggerHandler', TriggerHandlerService);

moduleComponents.forEach((component) => {
    app.component(component.name, component.value);
});
