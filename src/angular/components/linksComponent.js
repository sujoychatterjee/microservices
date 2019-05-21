import style from '../../css/links.css';

class LinksController {
    constructor(contentManager) {
        this.contentManager = contentManager;
    }

    newTab(type) {
        this.contentManager.sendTrigger(type, {action: 'open_new_tab'});
    }
}

LinksController.$inject = ['contentManager'];

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
