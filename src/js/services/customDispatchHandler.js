import { store } from '../../store/stateStore';

export class CustomDispatchHandlerService {
    constructor($state) {
        this.$state = $state;

        this.customHandlers = {
            go_to_route: this.goToRoute.bind(this),
            add_tab: this.addNewTab.bind(this),
        }
    }

    goToRoute({ payload }) {
        const { stateName, params } = payload;
        return this.$state.go(stateName, params, { inherit: false });
    }

    addNewTab({ payload: tabDetails }) {
        const { viewId, title, name } = tabDetails;
        store.dispatch({
            type: 'add_tab',
            payload: {id: viewId, details: { title, name}, params: { viewId } },
        });
    }
}
CustomDispatchHandlerService.$inject = ['$state'];
