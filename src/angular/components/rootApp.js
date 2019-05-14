import style from '../../css/rootApp.css';

class RootAppController {

    constructor(contentManager) {
        this.contentManager = contentManager;
    }
}
RootAppController.$inject = ['contentManager'];

export const RootApp = {
    controller: RootAppController,
    controllerAs: 'abc',
    template: `<div id="root-app">
        <div id="app-left-panel">
            <left-panel />
        </div>
        <div id="app-content">
            <div>
                <links-component content="abc.contentManager.content" />
            </div>
            <div>
                <ui-view></ui-view>
            </div>
        </div>
    </div>`,
};
