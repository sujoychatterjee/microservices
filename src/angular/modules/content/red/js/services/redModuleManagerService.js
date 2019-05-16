export class RedModuleManagerService {

    constructor() {
        this.name = 'red';
        this.hint = 'Red';
        this.color = '#ff4444';
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
        return '<div id="red-content"><h3>This is Red content</h3></div>';
    }

    getIconColor() {
        return this.color;
    }
}