## redux源码
### redux.js共export以下几个方法：
* createStore
* bindActionCreater
* appllyMiddleware
* combineReducers
* compose
### 一. createStore主要提供几个方法:
* getState() ：获取数据
* dispatch(action):令reducer(state,action)执行，同时执行通过subscribe push到数组中的函数
*  subscribe(fn)：数据改变之后需要执行的code,如用来setState,返回值是一个删除该fn的函数，当componentUnmount时可以执行
```javaScript
function createStore(reducer,fn) {
  let state;
  let listeners = [];
  let dispatch = (action) => {
    state = reducer(state,action);
    listeners.forEach(fn=>fn());
  }
  dispatch({type:'@INIT'});
  if(typeof fn === 'function'){ // 用了中间件,我就通过applyMiddleware这个方法来创建容器
    return fn(createStore)(reducer);
  }
  let getState = ()=> JSON.parse(JSON.stringify(state));
  let subscribe = (fn)=>{
    listeners.push(fn);
    return ()=>{
      listeners = listeners.filter(l=>l!=fn);
    }
  }
  return {getState,subscribe,dispatch}
}
```
### 二、bindActionCreater
* 目的是将mapDispatchToProps方法转化为一个action对象：connect((state)=>({...state}),actions)(Counter)
```javaScript
function bindActionCreators(actions,dispatch){
  let obj = {}
  for(let key in actions){ // {add(){},minus(){}}
    obj[key] = (...args)=>dispatch(actions[key](...args))
  }
  return obj;
}
```
### 三、appllyMiddleware
* 将中间件应用于redux中，中间件原理是重写createStore的dispatch方法。
* 该方法是个高阶函数,参数分别为middlewares、createStore、reducer
```javaScript
let applyMiddleware = (...middlewares)=> (createStore)=> (reducer)=>{
  let store = createStore(reducer);
  let fns = middlewares.map(middleware=>{
    return middleware(store)
  });
  let newDispatch = compose(...fns)(store.dispatch);// compose(fn1,fn2)(store.dispatch)
  return {...store,dispatch:newDispatch};
}

```
`请注意中间件的参数分别为store,dispatch,action:`
```javaScript
let reduxLogger2 = (store)=>(dispatch)=>(action)=>{
  console.log('2prev',store.getState());
  dispatch(action)
  console.log('2next',store.getState());
}
```
### 四、combineReducers
* 将所有reducer汇集在一起，并将返回的值组成一个对象，格式：{Counter：{number:0},List:{id:1,name:'lena'}}
* 返回仍是一个reducer，其返回值，将会作为state
```javaScript
let combineReducers = (reducers)=>{
  // reducer需要返回一个默认的状态 （）
  return (state={},action)=>{
    let obj = {}
    for(let key in reducers){
      obj[key] = reducers[key](state[key],action)
    }
    return obj;
  }
}
```
### 五、compose
* 用来处理函数叠加功能，也就是参数会传入compose参数最后一个函数，然后再将此函数嵌套在前一个函数里
```javaScript
function compose(...args){
  return args.reduce((a,b)=>((...args)=>a(b(...args))));
}
//类似如下效果:
// compose 要把多个中间件组合起来
// function add(a,b){
//   return a+b;
// }
// function toUpperCase(str){
//   return str.toUpperCase();
// }
// function len(str){
//   return str.length
// }

```