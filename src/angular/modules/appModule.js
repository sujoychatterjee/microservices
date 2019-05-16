import * as angular from 'angular';
import '@uirouter/angularjs';
import '../modules/basicModule';
import '../modules/content';
import { RootApp } from '../components/rootApp';
import { ContentMananger } from '../services/contentManager';

let $stateProviderSaved;

const app = angular.module('app', ['ui.router', 'app.basic', 'app.blue', 'app.red', 'app.green', 'app.yellow']);

app.config(['$stateProvider', ($stateProvider) => {
    $stateProviderSaved = $stateProvider;
}]);

app.run(['contentManager', (contentMananger) => {
    contentMananger.initialize($stateProviderSaved);
}]);

app.component('rootApp', RootApp);
app.service('contentManager', ContentMananger);