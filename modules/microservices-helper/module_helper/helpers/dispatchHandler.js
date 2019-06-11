import { Subject } from 'rxjs';
import { store } from './storeHelper';

export class DispatchHandler {
    constructor(type, customDispatchHandlers) {
        this.type = type;
        this.customDispatchHandlers = customDispatchHandlers;
        this.inbound$ = new Subject();
        this.outbound$ = new Subject();

        this.setupTriggers(this.inbound$);
        this.dispatch = this.dispatch.bind(this);
    }

    setupTriggers(inbound$) {
        inbound$.subscribe(this.handleMessage.bind(this));
    }

    handleMessage(action) {
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
    
    dispatch(action, to = 'self') {
        if (to === 'self') {
            this.inbound$.next(action);
        } else if (to === 'outer'){
            this.outbound$.next(action);
        } else {
            this.outbound$.next({
                type: 'module_dispatch',
                payload: {
                    action,
                    to
                },
            });
        }
    }
}
