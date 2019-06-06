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

    goToRoute({stateName, params, details}) {
        return this.$state.go(stateName, params, { inherit: false });
    }
}
TriggerHandlerService.$inject = ['$state'];
