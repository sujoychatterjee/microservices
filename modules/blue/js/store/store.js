export let dispatch;

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

export function setDispatch(dispatchFn) {
    dispatch = dispatchFn;
}

export { store, store$ } from 'microservices-helper/module_helper';
