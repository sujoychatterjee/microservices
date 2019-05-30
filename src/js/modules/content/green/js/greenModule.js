import { react2angular } from 'react2angular';
import { greenModuleHelper } from './helpers/greenModuleHelper';
import { GreenContainer } from './components/greenContainer';
import { registerModuleHelper } from '../../../../services/registerModuleHelper';

class GreenModule {
  constructor() {
    registerModuleHelper.registerModule(greenModuleHelper.getRegisterObject());
  }
}

export const greenModule = new GreenModule();
