import * as angular from 'angular';
import '@uirouter/angularjs';
import '../modules/basicModule';
import '../modules/content';
import { RootApp } from '../components/rootApp';
import { ContentMananger } from '../services/contentManager';
import { TriggerHandlerService } from '../services/triggerHanderService';

// -----------------------
import { blueModule, rootComponent as blueRootComponent } from '../modules/content/blue/js/blueModule';
import '../modules/content/green/js/greenModule';
// -----------------------

import { registerModuleHelper } from '../services/registerModuleHelper';

const moduleComponents = registerModuleHelper.getComponents();
const moduleOptions = registerModuleHelper.getModuleOptions();

let $stateProviderSaved;

const app = angular.module('app', ['ui.router', 'app.basic', 'app.red', 'app.yellow']);

app.config(['$stateProvider', ($stateProvider) => {
    $stateProviderSaved = $stateProvider;
}]);

app.run(['contentManager', (contentMananger) => {
    contentMananger.initialize($stateProviderSaved);

    // -----------------------
    blueModule.init(contentMananger);
    // -----------------------

    moduleOptions.forEach((options) => {
        contentMananger.registerContent(options);
    });
    
}]);

app.component('rootApp', RootApp);
app.service('contentManager', ContentMananger);
app.service('triggerHandler', TriggerHandlerService);

// -----------------------
app.component(blueRootComponent.name, blueRootComponent.component);
// -----------------------

moduleComponents.forEach((component) => {
    app.component(component.name, component.value);
});
