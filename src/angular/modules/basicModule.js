import * as angular from 'angular';
import { leftPanel } from '../components/leftPanel';
import { linksComponent } from '../components/linksComponent';


const basicModule = angular.module('app.basic', []);

basicModule.component('leftPanel', leftPanel);
basicModule.component('linksComponent', linksComponent);
