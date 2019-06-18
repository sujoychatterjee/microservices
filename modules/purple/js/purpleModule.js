import styles from '../css/purpleStyles.css';
import { registerModule } from 'microservices-helper/module_helper';
import { purpleModuleHelper } from './services/purpleModuleManagerService';

export let dispatch;

class PurpleModule {
  constructor() {
    dispatch = registerModule(purpleModuleHelper.getRegisterObject());
  }
}

export const purpleModule = new PurpleModule();
