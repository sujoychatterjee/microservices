import { customHandlers } from './customDispatchHandler';
import { YellowContainer } from '../components/yellowContainer';

export class YellowModuleHelper {

    getRegisterObject() {
        return {
            routeName: 'app_yellow',
            url: '/yellow/{viewId:.*}',
            componentName: 'yellowContainer',
            component: YellowContainer,
            params: {
                viewId: '',
            },
            name: 'yellow',
            hint: 'Yellow',
            color: 'yellow',
            customDispatchHandlers: customHandlers,
        }
    }
}

export const yellowModuleHelper = new YellowModuleHelper();
