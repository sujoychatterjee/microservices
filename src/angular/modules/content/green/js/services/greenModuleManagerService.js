import { TriggerHandlerService } from "./triggerHandlerService";
import { setStore } from '../utils/connectWrapper';

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

export class GreenModuleManagerService extends TriggerHandlerService {

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
            template: this.getTemplate,
            controller: GreenModuleController,
            params: {
                store: null,
            },
            hint: this.hint,
            color: this.color,
            store: [{
                name: 'green',
                initialState: {
                    ABC: 1,
                    DEF: 2,
                },
                reducers: {
                    ABC: (state, action) => {
                        return {...state, ABC: action.value};
                    },
                    DEF: (state, action) => {
                        return {...state, DEF: action.value};
                    },
                }
            }],
            triggerHelpers: {
                inbound: this.inbound$,
                outbound: this.outbound$.asObservable(),
            },
        }
    }

    getTemplate() {
        return '<div id="green-content"><h3>This is Green content</h3></div>';
    }
}