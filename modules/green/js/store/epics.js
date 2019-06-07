import { ofType } from 'redux-observable';
import { mapTo, delay } from 'rxjs/operators';

export const epics = [
    (action$) =>
        action$.pipe(
            ofType('delayed_increment_green_count'),
            delay(2000),
            mapTo({ type: 'increment_green_count' }),
        ),
    (action$) =>
        action$.pipe(
            ofType('delayed_decrement_green_count'),
            delay(2000),
            mapTo({ type: 'decrement_green_count' }),
        )

]
