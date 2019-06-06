import { blueModuleManagerService } from './helpers/blueModuleManagerService';
import { registerModuleHelper } from '../../../src/js/services/registerModuleHelper';

class BlueModule {
  constructor() {
    registerModuleHelper.registerModule(blueModuleManagerService.getRegisterObject());
  }
}

export const blueModule = new BlueModule();
