import { react2angular } from 'react2angular';
import styles from '../css/greenStyles.css';
import { greenModuleManagerService } from './services/greenModuleManagerService';
import { GreenContainer } from './components/greenContainer';

class GreenModule {
  init(contentManager) {
    contentManager.registerContent(greenModuleManagerService.getRegisterObject());
  }
}

export const greenModule = new GreenModule();
export const rootComponent = {
  name: 'greenContainer',
  component: react2angular(
    GreenContainer,
    ['viewId']
  ),
};