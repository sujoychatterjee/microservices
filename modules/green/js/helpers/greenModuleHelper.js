import { TriggerHandler } from "./triggerHandler";
import { routeDetails } from "../router";
import { storeDefinition as store } from '../store/store';
import { epics } from '../store/epics';

class GreenModuleHelper {

    constructor() {
        const { inbound$, outbound$ } = new TriggerHandler();
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
                outbound: this.outbound$,
            },
        }
    }
}

export const greenModuleHelper = new GreenModuleHelper();