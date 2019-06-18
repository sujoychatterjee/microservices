import { customHandlers } from './customDispatchHandler';
import { PurpleContainer } from '../components/purpleContainer';
import { moduleOptions } from '../modules/purpleModule';

export class PurpleModuleHelper {

    getRegisterObject() {
        return {
            routeName: 'app_purple',
            url: '/purple/{viewId:.*}',
            componentName: 'purpleContainer',
            component: PurpleContainer,
            params: {
                viewId: '',
                angular,
            },
            name: 'purple',
            hint: 'Purple',
            color: 'purple',
            customDispatchHandlers: customHandlers,
            angularModule: moduleOptions,
        }
    }
}

export const purpleModuleHelper = new PurpleModuleHelper();
