import { store, store$ } from '../store/store';
import { pluck } from 'rxjs/operators';

class StoreCounterController {
    constructor($scope, experimentalService) {
        this.experimentalServiceOwn = experimentalService;
        store$.pipe(pluck('count')).subscribe((count) => {
            this.storeCount = count;
            $scope.$applyAsync();
        });
    }

    increment() {
        store.dispatch({
            type: 'increment_count',
        });
    }

    decrement() {
        store.dispatch({
            type: 'decrement_count',
        });
    }
}

StoreCounterController.$inject = ['$scope', 'experimentalService'];

export const storeCounter = {
    controller: StoreCounterController,
    bindings: {
        experimentalService: '=',
    },

    template: `<h3 style="display:inline;margin-right:10px">Store Count: {{$ctrl.storeCount}}</h3><span></span>
    <button ng-click="$ctrl.increment()">+</button><button ng-click="$ctrl.decrement()">-</button>
    <h3>Experimental service id: {{$ctrl.experimentalServiceOwn.value}}</h3>
    <h3>Passed Experimental service id: {{$ctrl.experimentalService.value}}</h3>`,
}