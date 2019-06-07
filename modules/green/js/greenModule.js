import { greenModuleHelper } from './helpers/greenModuleHelper';
import { registerModule } from 'microservices-helper';

class GreenModule {
  constructor() {
    registerModule(greenModuleHelper.getRegisterObject());
  }
}

export const greenModule = new GreenModule();
