import { setStore } from './store/store';

class BlueModuleController {
    constructor($state) {
        this.$state = $state;
        this.store = this.$state.params.store;
        this.viewId = this.$state.params.viewId;
        this.store.dispatch({
            type: 'add_tab',
            payload: { details: { title: 'Blue tab', name: 'blue'}, params: { viewId: this.viewId } },
        });
        setStore(this.store);
    }
}

BlueModuleController.$inject = ['$state'];

export const routeDetails = {
    routeName: 'app_blue',
    url: '/blue/{viewId:.*}',
    template: '<blue-container view-id="vm.viewId" />',
    controller: BlueModuleController,
    controllerAs: 'vm',
    params: {
        store: null,
    },
}