import { store$ } from '../../store/stateStore';
import reducerRegistery from '../../store/reducers/reducerRegistery';
import { pluck } from 'rxjs/operators';

class TabsController {
    constructor() {
        reducerRegistery.register('tabs', [], {
            add_tab: (store, action) => {
                const newTabItem = action.payload;
                const existing = !!store.find((tabitem) => tabitem.params.viewId === newTabItem.params.viewId);
                if (existing) {
                    return store;
                } else {
                    return [...store, action.payload];
                }
            },
        });
        store$.pipe(pluck('tabs')).subscribe((tabs) => {
            this.tabs = tabs;
        });
    }
}

export const tabsComponent = {
    controller: TabsController,
    template: `<div>
        <span ng-repeat="tab in $ctrl.tabs"> {{tab.details.title}} </span>
    </div>`
}
