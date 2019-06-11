export let dispatch;

export const storeDefinition = [{
    name: 'green',
    initialState: {
        count: 50,
    },
    reducers: {
        increment_green_count: (state, action) => {
            return {...state, count: state.count + 1};
        },
        decrement_green_count: (state, action) => {
            return {...state, count: state.count - 1};
        },
    }
}];

export function setDispatch(dispatchFn) {
    dispatch = dispatchFn;
}

export { connect, store, store$ } from 'microservices-helper/module_helper';
