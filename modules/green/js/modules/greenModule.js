import * as angular from 'angular';
import { greenComponent } from '../components/greenComponent';
import { storeCounter } from '../components/storeCounter';
import { ExperimentalService } from '../services/experimentService';
import { blueOperations } from '../components/blueOperations';

const greenModule = angular.module('greenModule', []);

greenModule.component('greenComponent', greenComponent);
greenModule.component('storeCounter', storeCounter);
greenModule.component('blueOperations', blueOperations);
greenModule.service('experimentalService', ExperimentalService);
