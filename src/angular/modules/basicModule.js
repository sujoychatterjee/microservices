import * as angular from 'angular';
import { leftPanel } from '../components/leftPanel';
import { linksComponent } from '../components/linksComponent';
import { tabsComponent } from '../components/tabsComponent';


const basicModule = angular.module('app.basic', []);

basicModule.component('leftPanel', leftPanel);
basicModule.component('linksComponent', linksComponent);
basicModule.component('tabsComponent', tabsComponent);
