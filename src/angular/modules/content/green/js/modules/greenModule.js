import * as angular from 'angular';
import { greenComponent } from '../components/greenComponent';

const greenModule = angular.module('greenModule', []);

greenModule.component('greenComponent', greenComponent)