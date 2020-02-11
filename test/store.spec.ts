import chai from 'chai';
import { AnyAction, createStore } from '../src/createStore';

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
}

let store = createStore(counterReducer);
store.subscribe(() => {
  let state = store.getState();
  chai.expect(state).to.have.property('count');
})

describe("store unit test", () => {
  it('test INCREMENT', () => {
    store.dispatch({ type: 'INCREMENT' });
  }),
  it('test DECREMENT', () => {
    store.dispatch({ type: 'DECREMENT' });
  })
})