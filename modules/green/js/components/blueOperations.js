import { dispatch } from '../store/store';
import styles from '../../css/blueOperations.css';

class BlueOperationsController {
    incrementBlueCount() {
        dispatch({
            type: 'increment_blue_count',
        }, 'blue');
    }

    decrementBlueCount() {
        dispatch({
            type: 'decrement_blue_count',
        }, 'blue');
    }

    newBlueTab() {
        dispatch({
            type: 'open_new_tab',
        }, 'blue');
    }
}

export const blueOperations = {
    controller: BlueOperationsController,
    template: `
        <div class="blue-operations">
            <h3>Increment Blue value</h3> <button ng-click="$ctrl.incrementBlueCount()">+</button><button ng-click="$ctrl.decrementBlueCount()">-</button>
            <button class="new-blue" ng-click="$ctrl.newBlueTab()">Open new Blue tab</button>
        </div>
    `
}
