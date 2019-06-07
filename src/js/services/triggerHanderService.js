import { store } from '../../store/stateStore';

export class TriggerHandlerService {
    constructor($state) {
        this.$state = $state;
    }

    onTrigger(trigger) {
        switch(trigger.type) {
            case 'go_to_route':
                this.goToRoute(trigger.payload);
                break;
            case 'add_tab':
                this.addNewTab(trigger.payload);
                break;
        }
    }

    goToRoute({stateName, params, details}) {
        return this.$state.go(stateName, params, { inherit: false });
    }

    addNewTab(tabDetails) {
        const { viewId, title, name } = tabDetails;
        store.dispatch({
            type: 'add_tab',
            payload: {id: viewId, details: { title, name}, params: { viewId } },
        });
    }
}
TriggerHandlerService.$inject = ['$state'];
