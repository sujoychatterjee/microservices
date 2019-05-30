import { TriggerHandlerService } from "./triggerHandlerService";
import { routeDetails } from "../route";
import { storeDefinition as store } from '../store/store';
import { epics } from '../store/epics';

class BlueModuleManagerService {

    constructor() {
        const { inbound$, outbound$ } = new TriggerHandlerService();
        this.inbound$ = inbound$;
        this.outbound$ = outbound$;
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
            triggerHelpers: {
                inbound: this.inbound$,
                outbound: this.outbound$.asObservable(),
            },
        };
    }
}

export const blueModuleManagerService =  new BlueModuleManagerService();