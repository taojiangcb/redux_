import { Reducer, AnyAction } from '.';
import { compose } from './compose';
import { Store } from './createStore';

/**
 * 定义Middleware 洋葱模型 一个三次闭包的中间函数
 */
type Middleware = (stateFn: () => any) => (next: Reducer) => (action: AnyAction) => void;

/**
 * 中间件，
 * 
 * 1.先用洋葱模型，a(),b(),c() = a(b(c())) 这个的方式包裹 dispatch;
 * 需要重写 createStore 以及需要吧 store.dispatch 给替换掉
 * 
 * @param middlewares 
 */
const applyMiddleWares = (...middlewares: Middleware[]) => {

  /**oldCreateStoreFN 是之前的 createStore */
  return (oldCreateStoreFN: Function) => {

    /**这里重写了 createStore 方法并且 替换了 dispatch 的函数因子 */
    return function newCreateStore(reducer: Reducer, initState: any) {
      console.log(reducer,initState);
      let store: Store = oldCreateStoreFN(reducer, initState);

      //设置中间件的 state
      let chain = middlewares.map(middleware => {
        return middleware(store.getState);
      })

      /**中间件包裹 .dispatch 方法，这个是一个组合颗粒化的一个过程 */
      let dispatch = compose(...chain)(store.dispatch);
      store.dispatch = dispatch;
      return store;
    }
  }
}

export { applyMiddleWares, Middleware }