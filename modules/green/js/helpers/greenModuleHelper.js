import { routeDetails } from "../router";
import { storeDefinition as store } from '../store/store';
import { epics } from '../store/epics';
import { customHandlers } from './customDispatchHandler';

class GreenModuleHelper {

    getRegisterObject() {
        return {
            ...routeDetails,
            name: 'green',
            hint: 'Green',
            color: 'greenyellow',
            store,
            epics,
            customDispatchHandlers: customHandlers,
        }
    }
}

export const greenModuleHelper = new GreenModuleHelper();