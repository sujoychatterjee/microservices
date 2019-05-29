import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { Subject, BehaviorSubject } from 'rxjs';
import { rootEpic } from './epics/epicRegistery';

export const triggerReducerChange$ = new Subject();

export let store;
export let store$;

triggerReducerChange$.subscribe((reducers) => {
    if (store) {
        store.replaceReducer(reducers);
    } else {
        const epicMiddleware = createEpicMiddleware();
        store = createStore(reducers, applyMiddleware(epicMiddleware));
        epicMiddleware.run(rootEpic);
        store$ = new BehaviorSubject(store.getState());
        store.subscribe(() => store$.next(store.getState()));
    }
});
