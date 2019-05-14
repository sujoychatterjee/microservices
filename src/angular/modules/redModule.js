import * as angular from 'angular';


const redModule = angular.module('app.red', []);

let $stateProviderSaved;

// redModule.component('leftPanel', leftPanel);

redModule.config(['$stateProvider',($stateProvider) => {
    console.log(`StateProvider is ${$stateProvider}`);
    $stateProviderSaved = $stateProvider;
}]);

redModule.run(['contentManager',(contentManager) => {
    contentManager.registerContent({
        name: 'about',
        hint: 'About',
        template: '<h3>Its the UI-Router hello world app!</h3>'
      }, $stateProviderSaved)
}]);


