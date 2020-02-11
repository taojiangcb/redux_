import chai from 'chai';
import { AnyAction, createStore } from '../src/createStore';
import { combinReducers } from '../src/combinReducers';

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

function InfoReducer(state = { name: '' }, action: AnyAction) {
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

let reducers = combinReducers({
  InfoReducer, counterReducer
})

let store = createStore(reducers);

describe("combinReducers unit test", () => {

  it('test INCREMENT', () => {
    store.dispatch({ type: 'INCREMENT' });
    let state = store.getState();
    chai.expect(state).to.deep.include({ counterReducer: { count: 1 } }, JSON.stringify(state))
  }),

    it('test DECREMENT', () => {
      store.dispatch({ type: 'DECREMENT' });
      let state = store.getState();
      chai.expect(state).to.deep.include({ counterReducer: { count: 0 } }, JSON.stringify(state));
    }),

    it('test SET_NAME', () => {
      store.dispatch({ type: 'SET_NAME', name: 'taojiang' });
      let state = store.getState();
      chai.expect(state).to.deep.include({ InfoReducer: { name: 'taojiang' } }, JSON.stringify(state));
    }),

    it('test SET_DESCRIPTION', () => {
      store.dispatch({ type: 'SET_DESCRIPTION', description: 'this is a test' });
      let state = store.getState();
      chai.expect(state).to.deep.include({ InfoReducer: { name: 'taojiang', description: 'this is a test' } }, JSON.stringify(state));
    })

})