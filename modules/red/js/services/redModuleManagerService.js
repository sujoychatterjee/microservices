import { customHandlers } from './customDispatchHandler';
import { RedComponent } from '../components/redComponent';

export class RedModuleHelper {

    getRegisterObject() {
        return {
            routeName: 'app_red',
            url: '/red/{viewId:.*}',
            componentName: 'redContainer',
            component: RedComponent,
            params: {
                viewId: '',
            },
            name: 'red',
            hint: 'Red',
            color: '#ff4444',
            customDispatchHandlers: customHandlers,
        }
    }
}

export const redModuleHelper = new RedModuleHelper();
