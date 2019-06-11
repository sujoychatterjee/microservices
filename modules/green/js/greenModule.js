import { greenModuleHelper } from './helpers/greenModuleHelper';
import { registerModule } from 'microservices-helper/module_helper';
import { setDispatch } from './store/store';

class GreenModule {
  constructor() {
    const dispatch = registerModule(greenModuleHelper.getRegisterObject());
    setDispatch(dispatch);
  }
}

export const greenModule = new GreenModule();
