import { setStore as connectSetStore } from '../utils/connectWrapper';
import { BehaviorSubject } from "rxjs";

export let store;
export let store$;

export const storeDefinition = [{
    name: 'blue',
    initialState: {
        count: 100,
    },
    reducers: {
        increment_blue_count: (state, action) => {
            return {...state, count: state.count + 1};
        },
        decrement_blue_count: (state, action) => {
            return {...state, count: state.count - 1};
        },
    }
}];


export const setStore = (stateStore) => {
    store = stateStore;
    store$ = new BehaviorSubject(store.getState());
    store.subscribe(() => store$.next(store.getState()));

    connectSetStore(stateStore);
}
