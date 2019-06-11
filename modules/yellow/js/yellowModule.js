import styles from '../css/yellowStyles.css';
import { registerModule } from 'microservices-helper/module_helper';
import { yellowModuleHelper } from './services/yellowModuleManagerService';

export let dispatch;

class YellowModule {
  constructor() {
    dispatch = registerModule(yellowModuleHelper.getRegisterObject());
  }
}

export const yellowModule = new YellowModule();
