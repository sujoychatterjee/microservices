import { mapTo, delay } from "rxjs/operators";
import { ofType } from 'redux-observable'; 

export const epics = [
    (action$) =>
        action$.pipe(
            ofType('delayed_increment_blue_count'),
            delay(2000),
            mapTo({ type: 'increment_blue_count' }),
        ),
    (action$) =>
        action$.pipe(
            ofType('delayed_decrement_blue_count'),
            delay(2000),
            mapTo({ type: 'decrement_blue_count' }),
        )

]
