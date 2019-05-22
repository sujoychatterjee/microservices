import { TriggerHandlerService } from './triggerHandlerService';

class RedModuleController {
    constructor($state) {
        this.$state = $state;
        this.store = this.$state.params.store;
        this.viewId = this.$state.params.viewId;
        this.store.dispatch({
            type: 'add_tab',
            payload: {id: this.viewId, details: { title: 'Red tab'}, params: { viewId: this.viewId } },
        });
    }
}

RedModuleController.$inject = ['$state'];

export class RedModuleManagerService extends TriggerHandlerService {

    constructor(triggerHandlerService) {
        super();
        this.name = 'red';
        this.hint = 'Red';
        this.color = '#ff4444';
        this.routeName = 'app_red';
    }

    getRegisterObject() {

        return {
            name: this.name,
            hint: this.hint,
            routeName: this.routeName,
            url: '/red/{viewId:.*}',
            template: this.getTemplate,
            controller: RedModuleController,
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
        return '<div id="red-content"><h3>This is Red content</h3></div>';
    }
}

RedModuleManagerService.$inject = [];
