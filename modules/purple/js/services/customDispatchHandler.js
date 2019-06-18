import { dispatch } from "../purpleModule";

class CustomDispatchHandler {
    
    constructor() {
        this.customHandlers = {
            open_new_tab: this.openNewTab.bind(this),
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
            title: `Purple ${viewId}`,
        }
    }

    openNewTab({ payload }) {

        const { params = this.getRouteParams(), details = this.getViewDetails(params) } = payload || {};
        
        dispatch({
            type: 'go_to_route',
            payload: {
                stateName: 'app_purple',
                params: params,
                details,
            },
        }, 'core');
    }
}

const customHandler = new CustomDispatchHandler();

export const customHandlers = customHandler.customHandlers;
