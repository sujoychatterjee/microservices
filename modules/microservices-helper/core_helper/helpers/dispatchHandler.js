import { Subject } from "rxjs";

export class DispatchHandler {
    constructor(customDispatchHandlers, store) {
        this.customDispatchHandlers = customDispatchHandlers;
        this.store = store;

        this.inbound$ = new Subject();
        this.outbound$ = new Subject();

        this.inbound$.subscribe(this.handleMessage.bind(this));
    }

    addNewModuleSubscription(moduleOutbound$) {
        moduleOutbound$.subscribe(this.inbound$);
    }

    handleMessage(action) {
        if (action.type === 'module_dispatch') {
            const { action: forwardAction, to } = action.payload;
            this.dispatch(forwardAction, to);
        } else {
            const customHandler = this.customDispatchHandlers[action.type];
            if (customHandler) {
                customHandler(action);
            } else {
                this.store.dispatch(action);
            }
        }
    }

    dispatch(action, to = 'self') {
        if (to === 'self') {
            this.inbound$.next(action);
        } else {
            this.outbound$.next({ action, to });
        }
    }
}
