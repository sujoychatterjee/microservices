import { TriggerHandlerService } from "./triggerHandlerService";
import { setStore } from '../utils/connectWrapper';
import { ofType } from 'redux-observable';
import { mapTo, delay } from 'rxjs/operators';

class GreenModuleController {

    constructor($state) {
        this.$state = $state;
        this.store = this.$state.params.store;
        this.viewId = this.$state.params.viewId;
        this.store.dispatch({
            type: 'add_tab',
            payload: {id: this.viewId, details: { title: 'Green tab', name: 'green'}, params: { viewId: this.viewId } },
        });

        this.setupStoreProviders(this.store);
    }

    setupStoreProviders(store) {
        setStore(store);
    }

}

GreenModuleController.$inject = ['$state'];

class GreenModuleManagerService extends TriggerHandlerService {

    constructor() {
        super();
        this.name = 'green';
        this.routeName = 'app_green'
        this.hint = 'Green';
        this.color = 'greenyellow';
    }

    getRegisterObject() {
        return {
            name: this.name,
            routeName: this.routeName,
            url: '/green/{viewId:.*}',
            template: '<green-container view-id="vm.viewId" />',
            controller: GreenModuleController,
            controllerAs: 'vm',
            params: {
                store: null,
            },
            hint: this.hint,
            color: this.color,
            store: [{
                name: 'green',
                initialState: {
                    count: 50,
                },
                reducers: {
                    increment_green_count: (state, action) => {
                        return {...state, count: state.count + 1};
                    },
                    decrement_green_count: (state, action) => {
                        return {...state, count: state.count - 1};
                    },
                }
            }],
            epics: this.getEpics(),
            triggerHelpers: {
                inbound: this.inbound$,
                outbound: this.outbound$.asObservable(),
            },
        }
    }

    getEpics() {
        return [
            (action$) =>
                action$.pipe(
                    ofType('delayed_increment_green_count'),
                    delay(2000),
                    mapTo({ type: 'increment_green_count' }),
                ),
            (action$) =>
                action$.pipe(
                    ofType('delayed_decrement_green_count'),
                    delay(2000),
                    mapTo({ type: 'decrement_green_count' }),
                )

        ]
    }
}

export const greenModuleManagerService = new GreenModuleManagerService();