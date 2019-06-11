import * as angular from 'angular';
import styles from '../css/redStyles.css';
import { redModuleHelper } from './services/redModuleManagerService';
import { registerModule } from 'microservices-helper/module_helper';

export let dispatch;

class RedModule {
  constructor() {
    dispatch = registerModule(redModuleHelper.getRegisterObject());
  }
}

export const redModule = new RedModule();
