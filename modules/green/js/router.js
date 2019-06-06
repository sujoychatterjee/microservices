import { GreenContainer } from './components/greenContainer';

export const routeDetails = {
    routeName: 'app_green',
    url: '/green/{viewId:.*}',
    componentName: 'greenContainer',
    component: GreenContainer,
    params: {
        store: null,
        services: {},
        viewId: '',
    },
}