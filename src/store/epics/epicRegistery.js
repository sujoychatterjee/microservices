import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

export const epic$ = new BehaviorSubject((action$) => action$.pipe(
    ofType('')
  ));
export const rootEpic = (action$, state$) => epic$.pipe(
  mergeMap(epic => epic(action$, state$))
);
