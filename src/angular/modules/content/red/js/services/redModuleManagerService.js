import { TriggerHandlerService } from './triggerHandlerService';

export class RedModuleManagerService extends TriggerHandlerService {

    constructor(triggerHandlerService) {
        super();
        this.name = 'red';
        this.hint = 'Red';
        this.color = '#ff4444';
        this.routeName = 'app_red';
    }

    getRegisterObject() {

        return {
            name: this.name,
            routeName: this.routeName,
            url: '/green/{viewId:.*}',
            hint: this.hint,
            template: this.getTemplate,
            color: this.color,
            triggerHelpers: {
                inbound: this.inbound$,
                outbound: this.outbound$.asObservable(),
            },
        }
    }


    getTemplate() {
        return '<div id="red-content"><h3>This is Red content</h3></div>';
    }
}

RedModuleManagerService.$inject = [];
