import { createStore } from 'redux';
import { Subject } from 'rxjs';

export const triggerReducerChange$ = new Subject();

export let store;

triggerReducerChange$.subscribe((reducers) => {
    if (store) {
        store.replaceReducer(reducers);
    } else {
        store = createStore(reducers);
    }
});
