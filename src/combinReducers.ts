import { AnyAction, Reducer } from "./createStore";

/**
 * 合并reducer
 * @param reducers 
 */
const combinReducers = (reducers: { [k: string]: Reducer }) => {
  if (!reducers) reducers = {};
  let keys = Object.keys(reducers);
  return (state: any = {}, action: AnyAction) => {
    let newState: any = {};
    keys.reduce((s, key) => {
      let reducer: Reducer = reducers[key];

      /**获取之前没被reducer之前的 state */
      let pureState = state[key];

      if (reducer) {
        /**如果pureState 是 undefine 那么reducer 会初始化 state */
        s[key] = reducer(pureState, action);
      }
      else {
        console.warn(`reducer:${key} not's undefine`);
      }
      return s;
    }, newState)
    return newState;
  }
}

export { combinReducers }