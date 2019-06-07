import rooAppStyle from '../../css/rootApp.css';
import frameStyle from '../../css/frame.css';

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
                <store-counter />
            </div>
            <div>
                <store-counter />
            </div>
            <div id="app-content-container">
                <div>
                    <tabs-component />
                </div>
                <div id="app-content">
                    <ui-view></ui-view>
                </div>
            </div>
        </div>
    </div>`,
};
