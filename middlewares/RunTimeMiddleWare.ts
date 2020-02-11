import { Middleware } from "../src";
import { AnyAction } from '../src/createStore';

const runTimeMiddleWare:Middleware = (fn:Function) => {
  return (dispatch:Function) => {
    return (action:AnyAction) => {
      let s:number = Date.now();
      dispatch(action);
      let n:number = Date.now();
      console.log('the reducer run time is ' + n +" ms");
    }
  }
}

export {runTimeMiddleWare}