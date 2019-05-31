import { blueModuleManagerService } from './helpers/blueModuleManagerService';
import { registerModuleHelper } from '../../../../services/registerModuleHelper';

class BlueModule {
  constructor() {
    registerModuleHelper.registerModule(blueModuleManagerService.getRegisterObject());
  }
}

export const blueModule = new BlueModule();
