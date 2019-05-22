import { createStore } from 'redux';
import { Subject, Observable } from 'rxjs';

export const triggerReducerChange$ = new Subject();

export let store;
export let store$;

triggerReducerChange$.subscribe((reducers) => {
    if (store) {
        store.replaceReducer(reducers);
    } else {
        store = createStore(reducers);
        store$ = Observable.create((observer) => store.subscribe(() => observer.next(store.getState())));
    }
});
