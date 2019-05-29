import { setStore } from './store/store';

class GreenModuleController {

    constructor($state) {
        this.$state = $state;
        this.store = this.$state.params.store;
        this.viewId = this.$state.params.viewId;
        this.services = this.$state.params.services;
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

export const routeDetails = {
    routeName: 'app_green',
    url: '/green/{viewId:.*}',
    template: '<green-container view-id="vm.viewId" services="vm.services" />',
    controller: GreenModuleController,
    controllerAs: 'vm',
    params: {
        store: null,
        services: {},
    },
}