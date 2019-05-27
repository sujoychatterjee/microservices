import { store$, store } from '../../store/stateStore';
import reducerRegistery from '../../store/reducers/reducerRegistery';
import { pluck } from 'rxjs/operators';

reducerRegistery.register('count', 0, {
    increment_count: (store, action) => {
        return store + 1;
    },
    decrement_count: (store, action) => {
        return store - 1;
    },
});

class StoreCounterController {
    constructor($scope) {
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

StoreCounterController.$inject = ['$scope'];

export const storeCounter = {
    controller: StoreCounterController,

    template: `<h3>Store Count: {{$ctrl.storeCount}}</h3><span></span><button ng-click="$ctrl.increment()">+</button><button ng-click="$ctrl.decrement()">-</button>`,
}