import { blueModuleManagerService } from './helpers/blueModuleManagerService';
import { registerModule } from 'microservices-helper';

class BlueModule {
  constructor() {
    registerModule(blueModuleManagerService.getRegisterObject());
  }
}

export const blueModule = new BlueModule();
