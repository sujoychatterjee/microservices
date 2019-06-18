import styles from '../../css/purpleInnerComponent.css';

class PurpleInnerController {
    constructor() {
        // no op
    }
}

PurpleInnerController.$inject = [];

export const purpleInnerComponent = {
    template: `<div class='angular-inner-component'><h3>[Angular Part]</h3>
        <purple-app-store-counter></purple-app-store-counter>
    </div>`,
    controller: PurpleInnerController,
}