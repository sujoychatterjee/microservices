import * as angular from 'angular';
import { yellowInnerComponent } from "../components/yellowInnerComponent";
import { storeCounter } from '../components/storeCounter';

const yellowModule = angular.module('yellowModule', []);
yellowModule.component('yellowInnerComponent', yellowInnerComponent);
yellowModule.component('storeCounter', storeCounter);
