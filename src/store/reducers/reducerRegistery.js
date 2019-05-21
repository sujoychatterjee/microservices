import { combineReducers } from 'redux';
import { triggerReducerChange$ } from '../stateStore';

class ReducerRegister {

  constructor() {
    this.reducersMap = {};
  }

  /**
   * This function combines all the reducer object maps and returns combined reducers.
   */
  getReducers() {
    return  combineReducers(this.reducersMap);
  }

  /**
   * This function registers a new register in the store.
   * It first creates reducer from initial state and reducerObjectMap. Then merges it with the existing reducers object.
   * After merging, it calls the change function with the new merged reducers which replace old reducers in the state
   *
   * @param name: string - the sliceName where the reducer should be registered in the store
   * @param initialState - initialState of the reducer
   * @param newReducerMap - object of reducers with keys as action types.
   */
  register(
    name,
    initialState,
    newReducerMap,
  ) {
    const createdReducers = this.createReducer(initialState, newReducerMap);
    this.reducersMap = this.mergeReducer(name, createdReducers);

    triggerReducerChange$.next(this.getReducers());
  }

  /**
 * Helper to create a reducer, taken from:
 * https://github.com/reactjs/redux/blob/master/docs/recipes/ReducingBoilerplate.md#generating-reducers
 *
 * If you need your reducer to do something different, just create your own reducer function the way you want it.
 *
 * @param initialState
 * @param handlers
 * @returns {(state: any, action) => (any | any)}
 */
createReducer(
    initialState,
    handlers,
  ) {
    return function reducer(state = initialState, action) {
      if (handlers.hasOwnProperty(action.type)) {
        return handlers[action.type](state, action);
      } else {
        return state;
      }
    };
  }

  /**
   * This function sets the change listener, which gets fired with the merged reducers every time a reducer is registered.
   * The change listener must be set only once from the stateStore.ts which replaces the reducers in the store.
   *
   * @param listener
   */
  setChangeListener(listener) {
    // this must be set only once by the store
    if (this.emitChange !== null) {
      return;
    }
    this.emitChange = listener;
  }

  /**
   * This function merges the reducer being registered with the existing reducers.
   * If the sliceName does not exists in the reducersMap, it is initialised as an object.
   *
   * eg. sliceName - `views.a.b` - If 'a' does not exist in the views, it will initialise it as {}
   * and then add reducer corresponding to a.b.
   *
   * @param name: string - sliceName, can have '.' for nested slices
   * @param reducer: Reducer - to be added corresponding to the sliceName
   */
  mergeReducer(name, reducer){
    const reducers = this.reducersMap;
    name.split('.').reduce((acc, key, index, arr) => {
      return (acc[key] = index === arr.length - 1 ? reducer : acc[key] || {});
    }, reducers);
    return reducers;
  }
}

const reducerRegistry = new ReducerRegister();
export default reducerRegistry;
