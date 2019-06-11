import { routeDetails } from "../route";
import { storeDefinition as store } from '../store/store';
import { epics } from '../store/epics';
import { customHandlers } from './customDispatchHandler';

class BlueModuleManagerService {

    constructor() {
        this.name = 'blue';
        this.hint = 'Blue';
        this.color = '#69b4f1';
    }

    getRegisterObject() {
        return {
            ...routeDetails,
            name: this.name,
            hint: this.hint,
            color: this.color,
            store,
            epics,
            customDispatchHandlers: customHandlers,
        };
    }
}

export const blueModuleManagerService =  new BlueModuleManagerService();