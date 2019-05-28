import { Subject } from 'rxjs';

export class TriggerHandlerService {

    constructor() {
        this.inbound$ = new Subject();
        this.outbound$ = new Subject();

        this.setupTriggers(this.inbound$, this.outbound$);
    }

    onTrigger(trigger) {
        switch(trigger.action) {
            case 'open_new_tab':
                this.openNewTab(trigger.payload);
                break;
        }
    }

    setupTriggers(inbound$, outbound$) {
        inbound$.subscribe(this.onTrigger.bind(this));   
        this.outbound$ = outbound$;
    }

    sendTrigger(trigger) {
        if (this.outbound$) {
            this.outbound$.next(trigger);
        } else {
            throw new Error('Trigger observable not set');
        }
    }

    getRouteParams() {
        const viewId = Math.ceil(Math.random() * 100000);
        return {
            viewId,
        }
    }

    getViewDetails({ viewId }) {
        return {
            title: `Yellow ${viewId}`,
        }
    }

    openNewTab({params = this.getRouteParams(), details = this.getViewDetails(params)} = {}) {
        
        this.sendTrigger({
            action: 'go_to_route',
            payload: {
                stateName: this.routeName,
                params: params,
                details,
            },
        });
    }
}