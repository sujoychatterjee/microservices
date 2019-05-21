import { TriggerHandlerService } from "./triggerHandlerService";

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
            hint: this.hint,
            template: this.getTemplate,
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

    openNewInstance(details) {
        if (!details) {

        }
    }
}