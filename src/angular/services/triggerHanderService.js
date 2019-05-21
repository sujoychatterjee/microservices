export class TriggerHandlerService {
    constructor($state) {
        this.$state = $state;
    }

    onTrigger(trigger) {
        switch(trigger.action) {
            case 'go_to_route':
                this.goToRoute(trigger.payload);
                break;
        }
    }

    goToRoute(route) {
        return this.$state.go(route.stateName, route.params, { inherit: false });
    }
}
TriggerHandlerService.$inject = ['$state'];
