import * as angular from 'angular';


const blueModule = angular.module('app.blue', []);

let $stateProviderSaved;

// redModule.component('leftPanel', leftPanel);

blueModule.config(['$stateProvider',($stateProvider) => {
    console.log(`StateProvider is ${$stateProvider}`);
    $stateProviderSaved = $stateProvider;
}]);

blueModule.run(['contentManager',(contentManager) => {
    contentManager.registerContent({
        name: 'hello',
        hint: 'Hello',
        template: '<h3>hello world!</h3>'
      }, $stateProviderSaved)
}]);