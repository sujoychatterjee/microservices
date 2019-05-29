import * as angular from 'angular';
import styles from '../css/redStyles.css';
import { RedModuleManagerService } from './services/redModuleManagerService';
import { TriggerHandlerService } from './services/triggerHandlerService';


const redModule = angular.module('app.red', []);
redModule.service('redModuleManagerService', RedModuleManagerService);
redModule.service('triggerHandlerService', TriggerHandlerService);

redModule.run([
  'contentManager', 'redModuleManagerService',
  (contentManager, redModuleManagerService) => {
    contentManager.registerContent(redModuleManagerService.getRegisterObject());
  }
]);
