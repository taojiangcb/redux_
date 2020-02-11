


/**
 * action
 */
interface AnyAction<S = any> {
  type: string | number | Symbol;
  [extraProps: string]: any;
}

/**
 * 每个reducer 都会返回一个state的clone，来代替新的 state
 */
type Reducer = (state: any, action: AnyAction) => any;

/** 取消订阅 */
type unsbuscribe = () => void;


/**
 * Store 对象
 */
interface Store {
  subscribe: (listener: Function) => unsbuscribe;
  dispatch: (action: AnyAction) => void;
  getState: () => any;
}

/**
 * 面向函数是思维
 *  value 即是 state
 *  dispatch -> map
 *  
 * 创建一个store容器,基于发布订模式来处理，dispatch派发出的action处理对应的reducer
 * 注意:Action 唯一
 */

function createStore(reducer: Reducer, initState: any = undefined, middlewares?: Function): Store {

  let overrideCreateStore = undefined;
  if (typeof initState === 'function') {
    overrideCreateStore = initState;
    initState = undefined;
  }

  //如果有中间件的情况下
  if (overrideCreateStore) {
    /**拿到重写的 createStore 方法 */
    let newCreateStore = overrideCreateStore(createStore);
    //使用新的方法创建store，其中会用中间件洋葱模型重写 dispatch 方法
    console.log(newCreateStore);
    return newCreateStore(reducer, initState);
  }

  /**
   *  状态管理
   */
  let state = initState;

  /**
   * 订阅者的列表 
   */
  let listeners: Function[] = [];

  /**
   * 观察消息订阅
   * @param listener 
   */
  function subscribe(listener: Function) {
    listeners.push(listener)
    return function unsbuscribe() {
      let del: number = listeners.indexOf(listener);
      if (del > -1) listeners.splice(del);
    }
  };

  /**
   * 派发一个 action 对象
   * @param action 
   */
  function dispatch(action: AnyAction) {
    let newState = reducer(state, action);
    state = newState;
    let len = listeners.length;
    //reducer 处理完了之后，回调订阅者
    while (--len > -1) listeners[len]();
  };

  function getState(): any {
    return state;
  }

  /**在createStore 被调用的时候先初始化所有的reducer，这个的reducer是穿透的每个都会执行到位 */
  dispatch({ type: Symbol.for('initReuders') })

  return { dispatch, subscribe, getState }
}

export { Store, createStore, Reducer, AnyAction, unsbuscribe }