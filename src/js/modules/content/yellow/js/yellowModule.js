import * as angular from 'angular';
import styles from '../css/yellowStyles.css';
import { YellowModuleManagerService } from './services/yellowModuleManagerService';


const yellowModule = angular.module('app.yellow', []);
yellowModule.service('yellowModuleManagerService', YellowModuleManagerService);

yellowModule.run([
  'contentManager', 'yellowModuleManagerService',
  (contentManager, yellowModuleManagerService) => {
    contentManager.registerContent(yellowModuleManagerService.getRegisterObject());
  }
]);