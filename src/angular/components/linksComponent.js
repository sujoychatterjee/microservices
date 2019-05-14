// import style from '../../css/rootApp.css';

class LinksController {
}

export const linksComponent = {
    controller: LinksController,
    bindings: {
        content: '<',
      },
    template: `<div id="app-links">
        <a ng-repeat="content in $ctrl.content" ui-sref="{{ content.name }}"> {{content.hint}} </div>
    </div>`,
};
