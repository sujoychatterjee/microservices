import * as angular from 'angular';
import '@uirouter/angularjs';
import './basicModule';
import '../modules/content';
import { RootApp } from '../components/rootApp';
import { TriggerHandlerService } from '../services/triggerHanderService';

import reducerRegistry from '../../store/reducers/reducerRegistery';
import { store } from '../../store/stateStore';
import { epic$ } from '../../store/epics/epicRegistery';
import { combineEpics } from 'redux-observable';

import { initializeModules } from 'microservices-helper';

// -----------------------
import 'blue';
import 'green';
// -----------------------

const app = angular.module('app', ['ui.router', 'app.basic', 'app.red', 'app.yellow']);

app.config([() => {
    console.log('Original config callback');
}]);

app.run([() => {
    console.log('Original run callback');
}]);

app.component('rootApp', RootApp);

const passedServices = ['experimentalService'];

initializeModules(app, TriggerHandlerService, passedServices, {
    store,
    epic$,
    reducerRegistry,
    combineEpics,
});
