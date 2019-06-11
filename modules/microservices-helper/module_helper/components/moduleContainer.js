import { setStore } from '../helpers/storeHelper';
import { getDispatch } from '../helpers/registerModuleHelper';

export function moduleContainer(ContainerComponent, { type, title } ) {
    return class ModuleContainer extends ContainerComponent {
        constructor(props) {
            super(props);
            setStore(props.store);
            const dispatch = getDispatch(type);
            dispatch({
                type: 'add_tab',
                payload: { viewId: props.viewId, title, name: type },
            }, 'outer');
        }
    }
}
