import * as angular from 'angular';
import styles from '../css/blueStyles.css';
import { BlueModuleManagerService } from './services/blueModuleManagerService';


const blueModule = angular.module('app.blue', []);

blueModule.service('blueModuleManagerService', BlueModuleManagerService);

blueModule.run([
  'contentManager', 'blueModuleManagerService',
  (contentManager, blueModuleManagerService) => {
    contentManager.registerContent(blueModuleManagerService.getRegisterObject());
  }
]);