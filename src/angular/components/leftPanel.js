// import style from '../../css/rootApp.css';

class LeftPanelController {
    constructor(contentManager, $scope) {
        this.data = [];
        this.data = [
            {
                name: 'File Name 1',
                type: 'green',
            },
            {
                name: 'File Name 2',
                type: 'blue',
            },
            {
                name: 'File Name 3',
                type: 'yellow',
            },
            {
                name: 'File Name 4',
                type: 'red',
            },
            {
                name: 'File Name 5',
                type: 'green',
            },
            {
                name: 'File Name 6',
                type: 'blue',
            },
            {
                name: 'File Name 7',
                type: 'yellow',
            },
            {
                name: 'File Name 8',
                type: 'red',
            },
            {
                name: 'File Name 9',
                type: 'green',
            },
            {
                name: 'File Name 10',
                type: 'blue',
            },
            {
                name: 'File Name 11',
                type: 'yellow',
            },
            {
                name: 'File Name 12',
                type: 'red',
            },
            {
                name: 'File Name 13',
                type: 'green',
            },
            {
                name: 'File Name 14',
                type: 'blue',
            },
            {
                name: 'File Name 15',
                type: 'yellow',
            },
            {
                name: 'File Name 16',
                type: 'red',
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
        const manager = this.contentManager.getManager(type);
        console.log(manager ? manager.getIconColor(): '');
        return manager ? manager.getIconColor() : '';
    }

    getStyle(type) {
        return {
            'background-color': this.getIconColor(type)
        }
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
            <div ng-repeat="data in $ctrl.data" ng-style="$ctrl.getStyle(data.type)">
                {{data.name}}
            <div/>
        </div>
    </div>`,
};
