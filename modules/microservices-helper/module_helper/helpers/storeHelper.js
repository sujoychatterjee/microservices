import { BehaviorSubject } from 'rxjs';
import { setStore as connectSetStore } from './connectWrapper';

export let store;
export let store$;

export const setStore = (stateStore) => {
    store = stateStore;
    store$ = new BehaviorSubject(store.getState());
    store.subscribe(() => store$.next(store.getState()));

    // connectSetStore(stateStore);
}
