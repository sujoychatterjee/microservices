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

export { connect, setStore, store, store$ } from 'microservices-helper';
