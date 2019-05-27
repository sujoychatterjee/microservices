import styles from '../../css/tabsComponent.css';
import { store$ } from '../../store/stateStore';
import reducerRegistery from '../../store/reducers/reducerRegistery';
import { pluck, map } from 'rxjs/operators';

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

class TabsController {
    constructor(contentManager) {
        store$.pipe(pluck('tabs')).pipe(map((tabs) => {
            return tabs.map((tabContent) => {
                const { title, name } = tabContent.details;
                const content = contentManager.getContent(name);
                return { title, route: content.routeName, params: tabContent.params };
            });
        })).subscribe((tabs) => {
            this.tabs = tabs;
        });
    }
}

TabsController.$inject = ['contentManager']

export const tabsComponent = {
    controller: TabsController,
    template: `<div class="tabs-container">
        <span ng-repeat="tab in $ctrl.tabs" class="tab" ui-state="tab.route" ui-state-params="tab.params" ui-sref-active="active"> {{tab.title}} </span>
    </div>`
}
