export class YellowModuleManagerService {

    constructor() {
        this.name = 'yellow';
        this.hint = 'Yellow';
        this.color = 'yellow';
    }

    getRegisterObject() {
        return {
            name: this.name,
            hint: this.hint,
            template: this.getTemplate,
            manager: {
                getIconColor: this.getIconColor.bind(this),
            },
        }
    }

    getTemplate() {
        return '<div id="yellow-content"><h3>This is Yellow content</h3></div>';
    }

    getIconColor() {
        return this.color;
    }
}