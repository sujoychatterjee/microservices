import { sendTrigger } from 'microservices-helper';
import styles from '../../css/blueOperations.css';

class BlueOperationsController {
    incrementBlueCount() {
        sendTrigger({
            type: 'increment_blue_count',
        }, 'blue');
    }

    decrementBlueCount() {
        sendTrigger({
            type: 'decrement_blue_count',
        }, 'blue');
    }

    newBlueTab() {
        sendTrigger({
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
