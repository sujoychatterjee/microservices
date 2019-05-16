import style from '../../css/links.css';

class LinksController {
}

export const linksComponent = {
    controller: LinksController,
    bindings: {
        content: '<',
      },
    template: `<div id="app-links">
        <a class="app-link" ui-sref-active="active" ng-repeat="content in $ctrl.content" ui-sref="{{ content.name }}"> {{content.hint}} </div>
    </div>`,
};
