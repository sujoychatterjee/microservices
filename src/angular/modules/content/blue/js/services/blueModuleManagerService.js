import { TriggerHandlerService } from "./triggerHandlerService";

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
            hint: this.hint,
            template: this.getTemplate,
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