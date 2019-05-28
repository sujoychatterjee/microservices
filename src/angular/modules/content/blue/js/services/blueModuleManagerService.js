import { TriggerHandlerService } from "./triggerHandlerService";
import { toJson } from "@uirouter/core";
import { mapTo, delay } from "rxjs/operators";
import { ofType } from 'redux-observable'; 
import { routeDetails } from "../initializers/route";

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
            store: [{
                name: 'blue',
                initialState: {
                    count: 100,
                },
                reducers: {
                    increment_blue_count: (state, action) => {
                        return {...state, count: state.count + 1};
                    },
                    decrement_blue_count: (state, action) => {
                        return {...state, count: state.count - 1};
                    },
                }
            }],
            epics: this.getEpics(),
            triggerHelpers: {
                inbound: this.inbound$,
                outbound: this.outbound$.asObservable(),
            },
        };
    }

    getEpics() {
        return [
            (action$) =>
                action$.pipe(
                    ofType('delayed_increment_blue_count'),
                    delay(2000),
                    mapTo({ type: 'increment_blue_count' }),
                ),
            (action$) =>
                action$.pipe(
                    ofType('delayed_decrement_blue_count'),
                    delay(2000),
                    mapTo({ type: 'decrement_blue_count' }),
                )

        ]
    }
}

export const blueModuleManagerService =  new BlueModuleManagerService();