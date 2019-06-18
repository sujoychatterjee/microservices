import { purpleInnerComponent } from "../components/purpleInnerComponent";
import { storeCounter } from '../components/storeCounter';

export const moduleOptions = {
    components: [
        {
            name: 'purpleInnerComponent',
            value: purpleInnerComponent,
        },
        {
            name: 'purpleAppStoreCounter',
            value: storeCounter,
        },
    ]
};