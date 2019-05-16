import * as angular from 'angular';
import styles from '../css/greenStyles.css';
import { GreenModuleManagerService } from './services/greenModuleManagerService';


const greenModule = angular.module('app.green', []);
greenModule.service('greenModuleManagerService', GreenModuleManagerService);

greenModule.run([
  'contentManager', 'greenModuleManagerService',
  (contentManager, greenModuleManagerService) => {
    contentManager.registerContent(greenModuleManagerService.getRegisterObject());
  }
]);