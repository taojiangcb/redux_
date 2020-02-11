import chai from 'chai';
import { AnyAction, createStore } from '../src/createStore';

import { logMiddleWare, applyMiddleWares, runTimeMiddleWare, combinReducers } from '../src';

let initState = { count: 0 }
let counterReducer = (state = { count: 0 }, action: AnyAction) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count + 1
      }
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state;
  }
};

const InfoReducer = (state = { name: '' }, action: AnyAction) => {
  switch (action.type) {
    case "SET_NAME":
      return {
        ...state,
        name: action.name
      }
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: action.description
      }
    default:
      return state;
  }
}


describe("middlewares unit test", () => {
  it('use middleware test', () => {
    let reducers = combinReducers({ InfoReducer, counterReducer })
    let middlewares = applyMiddleWares(logMiddleWare, runTimeMiddleWare);
    let store = createStore(reducers, middlewares);

    store.dispatch({ type: 'INCREMENT' });
    let state = store.getState();
    chai.expect(state).to.deep.include({ counterReducer: { count: 1 } }, JSON.stringify(state));
  })
})