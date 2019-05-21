import { TriggerHandlerService } from "./triggerHandlerService";

export class YellowModuleManagerService extends TriggerHandlerService{

    constructor() {
        super();
        this.name = 'yellow';
        this.hint = 'Yellow';
        this.color = 'yellow';
        this.routeName = 'app_yellow';
    }

    getRegisterObject() {
        return {
            name: this.name,
            routeName: this.routeName,
            url: '/yellow/{viewId:.*}',
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
        return '<div id="yellow-content"><h3>This is Yellow content</h3></div>';
    }
}