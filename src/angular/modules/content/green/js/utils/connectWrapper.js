import React from 'react';
import { connect as reduxConnect, Provider } from 'react-redux';

let stateStore;
export let store$;

class ConnectWrapperProvider {
    constructor() {
        this.setStore = this.setStore.bind(this);
        this.connect = this.connect.bind(this);
    }

    setStore(store) {
        stateStore = store;
    }

    connect(...config) {
        return (wrappedComponent) => {
            const ConnectedComponent = reduxConnect(...config)(wrappedComponent);
            return class WrappedComponent extends React.Component {
                render() {
                    if (this.context.store) {
                        return <ConnectedComponent {...this.props} />;
                    }
                    return (
                        <Provider store={stateStore}>
                            <ConnectedComponent {...this.props} />
                        </Provider>
                    );
                }
            }
        }
    }
}

export const { connect, setStore } = new ConnectWrapperProvider();
