import styles from '../../css/yellowInnerComponent.css';

class YellowInnerController {
    constructor() {
        // no op
    }
}

YellowInnerController.$inject = [];

export const yellowInnerComponent = {
    template: `<div class='angular-inner-component'><h3>[Angular Part]</h3>
        <store-counter></store-counter>
    </div>`,
    controller: YellowInnerController,
}