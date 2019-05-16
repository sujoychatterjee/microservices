export class GreenModuleManagerService {

    constructor() {
        this.name = 'green';
        this.hint = 'Green';
        this.color = 'greenyellow';
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
        return '<div id="green-content"><h3>This is Green content</h3></div>';
    }

    getIconColor() {
        return this.color;
    }
}