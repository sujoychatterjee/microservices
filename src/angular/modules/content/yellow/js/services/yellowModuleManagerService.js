import { TriggerHandlerService } from "./triggerHandlerService";

class YellowModuleController {
    constructor($state) {
        this.$state = $state;
        this.store = this.$state.params.store;
        this.viewId = this.$state.params.viewId;
        this.store.dispatch({
            type: 'add_tab',
            payload: {id: this.viewId, details: { title: 'Yellow tab'}, params: { viewId: this.viewId } },
        });
    }
}

YellowModuleController.$inject = ['$state'];

export class YellowModuleManagerService extends TriggerHandlerService{

    constructor() {
        super();
        this.name = 'yellow';
        this.hint = 'Yellow';
        this.color = 'yellow';
        this.routeName = 'app_yellow';
    }

    getRegisterObject() {
        return {
            name: this.name,
            routeName: this.routeName,
            url: '/yellow/{viewId:.*}',
            hint: this.hint,
            template: this.getTemplate,
            controller: YellowModuleController,
            params: {
                store: null,
            },
            color: this.color,
            triggerHelpers: {
                inbound: this.inbound$,
                outbound: this.outbound$.asObservable(),
            },
        }
    }

    getTemplate() {
        return '<div id="yellow-content"><h3>This is Yellow content</h3></div>';
    }
}