import style from '../../css/links.css';
import { dispatch } from 'microservices-helper/core_helper'

class LinksController {

    newTab(type) {
        dispatch({type: 'open_new_tab'}, type);
    }
}

export const linksComponent = {
    controller: LinksController,
    bindings: {
        content: '<',
      },
    template: `<div id="app-links">
        <span>Menu: </span>
        <span> <a class="app-link" ng-repeat="content in $ctrl.content" ng-click="$ctrl.newTab(content.name)"> {{content.hint}} </a></span>
    </div>`,
};
