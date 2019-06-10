import { setStore } from '../helpers/storeHelper';
import { getContent, sendTrigger } from '../helpers/angularAdapter';

export function moduleContainer(ContainerComponent, { type, title } ) {
    return class ModuleContainer extends ContainerComponent {
        constructor(props) {
            super(props);
            setStore(props.store);
            const moduleDef = getContent(type);
            if (moduleDef) {
                sendTrigger({
                    type: 'add_tab',
                    payload: { viewId: props.viewId, title, name: type },
                });
            }
        }
    }
}
