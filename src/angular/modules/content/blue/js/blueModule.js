import * as angular from 'angular';
import { react2angular } from 'react2angular';
import styles from '../css/blueStyles.css';
import { blueModuleManagerService } from './services/blueModuleManagerService';
import { BlueContainer } from './components/blueContainer';

class BlueModule {
  init(contentManager) {
    contentManager.registerContent(blueModuleManagerService.getRegisterObject());
  }
}

export const blueModule = new BlueModule();
export const rootComponent = {
  name: 'blueContainer',
  component: react2angular(
    BlueContainer
  ),
};
