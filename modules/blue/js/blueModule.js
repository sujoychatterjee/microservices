import { blueModuleManagerService } from './helpers/blueModuleManagerService';
import { registerModule } from 'microservices-helper/module_helper';
import { setDispatch } from './store/store';

class BlueModule {
  constructor() {
    const dispatch = registerModule(blueModuleManagerService.getRegisterObject());
    setDispatch(dispatch);
  }
}

const blueModule = new BlueModule();
