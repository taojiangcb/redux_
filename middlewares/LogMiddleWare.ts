import { Middleware } from "../src";
import { AnyAction } from '../src/createStore';

/**
 * 定义一个打印日志的中间件
 * @param getState 
 */
const logMiddleWare: Middleware = (getState: Function) => {
  return (dispatch: Function) => {
    return (action: AnyAction) => {
      let before = getState();
      console.log('action before state', JSON.stringify(before));
      dispatch(action);
      let after = getState();
      console.log('action after state', JSON.stringify(after));
    }
  }
}

export { logMiddleWare }