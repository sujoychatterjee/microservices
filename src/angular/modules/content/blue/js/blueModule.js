import * as angular from 'angular';
import { react2angular } from 'react2angular';
import styles from '../css/blueStyles.css';
import { BlueModuleManagerService } from './services/blueModuleManagerService';
import { BlueContainer } from '../../../../../react/blue/blueContainer';


const blueModule = angular.module('app.blue', []);

blueModule.service('blueModuleManagerService', BlueModuleManagerService);

blueModule.component(
  'blueContainer',
  react2angular(
    BlueContainer
  ),
);

blueModule.run([
  'contentManager', 'blueModuleManagerService',
  (contentManager, blueModuleManagerService) => {
    contentManager.registerContent(blueModuleManagerService.getRegisterObject());
  }
]);