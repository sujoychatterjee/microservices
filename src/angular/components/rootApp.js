import style from '../../css/rootApp.css';

class RootAppController {

    constructor(contentManager) {
        this.contentManager = contentManager;
    }
}
RootAppController.$inject = ['contentManager'];

export const RootApp = {
    controller: RootAppController,
    template: `<div id="root-app">
        <div id="app-left-panel">
            <left-panel />
        </div>
        <div id="app-content">
            <div>
                <links-component content="$ctrl.contentManager.content" />
            </div>
            <div id="app-content-container">
                <ui-view></ui-view>
            </div>
        </div>
    </div>`,
};
