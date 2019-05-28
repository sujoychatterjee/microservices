import { TriggerHandlerService } from "./triggerHandlerService";
import { routeDetails } from "../router";
import { store } from '../store/reducers';
import { epics } from '../store/epics';

class GreenModuleManagerService extends TriggerHandlerService {

    constructor() {
        super();
        const { inbound$, outbound$ } = new TriggerHandlerService();
        this.inbound$ = inbound$;
        this.outbound$ = outbound$;
    }

    getRegisterObject() {
        return {
            ...routeDetails,
            name: 'green',
            hint: 'Green',
            color: 'greenyellow',
            store,
            epics,
            triggerHelpers: {
                inbound: this.inbound$,
                outbound: this.outbound$.asObservable(),
            },
        }
    }
}

export const greenModuleManagerService = new GreenModuleManagerService();