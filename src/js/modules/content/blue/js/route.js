import { BlueContainer } from './components/blueContainer';

export const routeDetails = {
    routeName: 'app_blue',
    url: '/blue/{viewId:.*}',
    componentName: 'blueContainer',
    component: BlueContainer,
    params: {
        store: null,
        viewId: '',
        services: {},
    },
}