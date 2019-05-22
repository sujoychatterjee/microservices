import { TriggerHandlerService } from "./triggerHandlerService";

class BlueModuleController {
    constructor($state) {
        this.$state = $state;
        this.store = this.$state.params.store;
        this.viewId = this.$state.params.viewId;
        this.store.dispatch({
            type: 'add_tab',
            payload: { details: { title: 'Blue tab'}, params: { viewId: this.viewId } },
        });
    }
}

BlueModuleController.$inject = ['$state'];

export class BlueModuleManagerService extends TriggerHandlerService{

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
        };
    }

    getTemplate() {
        return '<blue-container />';
    }
}