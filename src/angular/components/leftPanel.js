// import style from '../../css/rootApp.css';

class LeftPanelController {
    constructor(contentManager, $scope) {
        this.data = [];
        this.data = [
            {
                name: 'File Name 1',
                type: 'green',
                id: 1,
            },
            {
                name: 'File Name 2',
                type: 'blue',
                id: 2,
            },
            {
                name: 'File Name 3',
                type: 'yellow',
                id: 3,
            },
            {
                name: 'File Name 4',
                type: 'red',
                id: 4,
            },
            {
                name: 'File Name 5',
                type: 'green',
                id: 5,
            },
            {
                name: 'File Name 6',
                type: 'blue',
                id: 6,
            },
            {
                name: 'File Name 7',
                type: 'yellow',
                id: 7,
            },
            {
                name: 'File Name 8',
                type: 'red',
                id: 8,
            },
            {
                name: 'File Name 9',
                type: 'green',
                id: 9,
            },
            {
                name: 'File Name 10',
                type: 'blue',
                id: 10,
            },
            {
                name: 'File Name 11',
                type: 'yellow',
                id: 11,
            },
            {
                name: 'File Name 12',
                type: 'red',
                id: 12,
            },
            {
                name: 'File Name 13',
                type: 'green',
                id: 13,
            },
            {
                name: 'File Name 14',
                type: 'blue',
                id: 14,
            },
            {
                name: 'File Name 15',
                type: 'yellow',
                id: 15,
            },
            {
                name: 'File Name 16',
                type: 'red',
                id: 16,
            },
        ];
        this.contentManager = contentManager;
        $scope.$watch('$ctrl.contentManager.content', this.filterContent.bind(this));
    }

    filterContent() {
        const types = this.contentManager.content.map(content => content.name);
        this.data = this.data.filter(fileData => types.includes(fileData.type));
    }

    getIconColor(type) {
        const content = this.contentManager.getContent(type);
        return content ? content.color : '';
    }

    getStyle(type) {
        return {
            'background-color': this.getIconColor(type)
        }
    }

    openItem(data) {
        this.contentManager.sendTrigger(data.type, {action: 'open_new_tab', payload: {viewId: data.id}});
    }


}

LeftPanelController.$inject = ['contentManager', '$scope'];


export const leftPanel = {
    controller: LeftPanelController,
    template: `<div id="left-panel">
        <div class="left-panel-header">
            Content Library
        </div>
        <div class="left-panel-content">
            <div ng-repeat="data in $ctrl.data" ng-style="$ctrl.getStyle(data.type)" ng-click="$ctrl.openItem(data)">
                {{data.name}}
            <div/>
        </div>
    </div>`,
};
