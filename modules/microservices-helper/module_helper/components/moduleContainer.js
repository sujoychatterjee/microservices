import { setStore } from '../helpers/storeHelper';
import { getDispatch } from '../helpers/registerModuleHelper';

export function getModuleContainer(React, Provider) {
    return class ModuleContainer extends React.Component {
        constructor(props) {
            super(props);
            setStore(props.store);
            const dispatch = getDispatch(props.type);
            dispatch({
                type: 'add_tab',
                payload: { viewId: props.viewId, title: props.title, name: props.type },
            }, 'core');
        }

        render() {
            if (Provider) {
                return <Provider store={this.props.store}>
                    {this.props.children}
                </Provider>;
            } else {
                return <> {this.props.children} </>;
            }
        }
    }
}
