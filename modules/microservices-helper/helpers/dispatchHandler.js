import { Subject } from 'rxjs';
import { store } from './storeHelper';

export class DispatchHandler {
    constructor(customDispatchHandlers) {
        this.customDispatchHandlers = customDispatchHandlers;
        this.inbound$ = new Subject();

        this.setupTriggers(this.inbound$);
    }

    setupTriggers(inbound$) {
        inbound$.subscribe(this.onTrigger.bind(this));
    }

    onTrigger(action) {
        if (this.customDispatchHandlers) {
            const handler = this.customDispatchHandlers[action.type];
            if (handler) {
                handler(action);
            } else {
                store.dispatch(action);
            }
        } else {
            store.dispatch(action);
        }
    }
}
