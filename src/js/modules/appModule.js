import * as angular from 'angular';
import '@uirouter/angularjs';
import './basicModule';
import { RootApp } from '../components/rootApp';
import { CustomDispatchHandlerService } from '../services/customDispatchHandler';

import reducerRegistry from '../../store/reducers/reducerRegistery';
import { store } from '../../store/stateStore';
import { epic$ } from '../../store/epics/epicRegistery';
import { combineEpics } from 'redux-observable';

import { initializeModules } from 'microservices-helper/core_helper';

// -----------------------
import 'blue';
import 'red';
import 'green';
import 'yellow';
import 'purple';
// -----------------------

const app = angular.module('app', ['ui.router', 'app.basic']);

app.config([() => {
    console.log('Original config callback');
}]);

app.run([() => {
    console.log('Original run callback');
}]);

app.component('rootApp', RootApp);
app.service('customDispatchHandlerService', CustomDispatchHandlerService);

const passedServices = ['experimentalService'];  

initializeModules(app, 'customDispatchHandlerService', passedServices, {
    store,
    epic$,
    reducerRegistry,
    combineEpics,
});
