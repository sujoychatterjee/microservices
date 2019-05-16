export class BlueModuleManagerService {

    constructor() {
        this.name = 'blue';
        this.hint = 'Blue';
        this.color = '#69b4f1';
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
        return '<div id="blue-content"><h3>This is Blue content</h3></div>';
    }

    getIconColor() {
        return this.color;
    }
}