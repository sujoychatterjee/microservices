import * as angular from 'angular';
import { greenComponent } from '../components/greenComponent';
import { storeCounter } from '../components/storeCounter';
import { ExperimentalService } from '../services/experimentService';

const greenModule = angular.module('greenModule', []);

greenModule.component('greenComponent', greenComponent);
greenModule.component('storeCounter', storeCounter);
greenModule.service('experimentalService', ExperimentalService);
