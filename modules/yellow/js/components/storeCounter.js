import { store$ } from 'microservices-helper/module_helper';
import { pluck } from 'rxjs/operators';
import { dispatch } from '../yellowModule';

class StoreCounterController {
    constructor($scope, experimentalService) {
        this.experimentalServiceOwn = experimentalService;
        store$.pipe(pluck('count')).subscribe((count) => {
            this.storeCount = count;
            $scope.$applyAsync();
        });
    }

    increment() {
        dispatch({
            type: 'increment_count',
        });
    }

    decrement() {
        dispatch({
            type: 'decrement_count',
        });
    }
}

StoreCounterController.$inject = ['$scope'];

export const storeCounter = {
    controller: StoreCounterController,

    template: `<h3 style="display:inline;margin-right:10px">Store Count: {{$ctrl.storeCount}}</h3><span></span>
    <button ng-click="$ctrl.increment()">+</button><button ng-click="$ctrl.decrement()">-</button>`,
}