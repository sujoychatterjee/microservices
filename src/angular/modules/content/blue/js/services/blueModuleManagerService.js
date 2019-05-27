import { TriggerHandlerService } from "./triggerHandlerService";
import { setStore } from '../utils/connectWrapper';
import { toJson } from "@uirouter/core";
import { mapTo, delay } from "rxjs/operators";
import { ofType } from 'redux-observable'; 


class BlueModuleController {
    constructor($state) {
        this.$state = $state;
        this.store = this.$state.params.store;
        this.viewId = this.$state.params.viewId;
        this.store.dispatch({
            type: 'add_tab',
            payload: { details: { title: 'Blue tab', name: 'blue'}, params: { viewId: this.viewId } },
        });

        console.log(Object.keys(setStore));
        setStore(this.store);
    }
}

BlueModuleController.$inject = ['$state'];

class BlueModuleManagerService extends TriggerHandlerService{

    constructor() {
        super();
        this.name = 'blue';
        this.routeName = 'app_blue'
        this.hint = 'Blue';
        this.color = '#69b4f1';
    }

    getRegisterObject() {
        return {
            name: this.name,
            routeName: this.routeName,
            url: '/blue/{viewId:.*}',
            template: this.getTemplate,
            controller: BlueModuleController,
            params: {
                store: null,
            },
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

    getTemplate() {
        return '<blue-container />';
    }
}

export const blueModuleManagerService =  new BlueModuleManagerService();