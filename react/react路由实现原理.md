## react-router-dom实现原理
```javaScript
import {BrowserRouter as Router,Route,Link,Switch,Redirect} from './react-router-dom'


render(<Router>
  <div>
    <Link to="/">首页 </Link>
    <Link to="/user">用户</Link>
    {/* <Switch>
      <Route path="/home" component={Home}></Route>
    </Switch> */}
     <Switch>
     
    <Route path="/" exact={true} component={Home}></Route>
      <Route path="/user" exact={true} component={User}></Route>
     <Route path="/article/:id" component={Article}/> */}
    
    </Switch>
  </div>
</Router>,window.root);
```

### BrowserRouter的实现

> BrowserRouter主要实现的功能：<br/>
 * 作为根元素保留了window.location.pathname的值，并作为state（pathname 每次改变，页面都会重新展示，故应作为state）
* 监听了popstate事件，每次路由变化时，获取pathname值并setState pathname的值
* 通过React.createContext()将{location:{pathname},history:{push}}传给其子组件
```javaScript
import React from 'react';
import {Provider} from './context';
// 需要存上当前的访问的路径
// 想染路径变化 刷新组件 路径定义在状态中 路径变化就更新状态
export default class BrowserRouter extends React.Component{
  state = {
    // 默认获取打开网页时的路径
    location:{
      pathname: window.location.pathname || '/',
    }
  }
  componentWillMount(){
    window.addEventListener('popstate',()=>{
      let pathname = window.location.pathname;
      this.handleChangeState(pathname);
    },false);
  }
  handleChangeState(pathname){
    this.setState({
      location:{
        ...this.state.location,
        pathname
      }
    })
  }
  render(){ // a
    let that = this;
    let value = {
      ...this.state,
      history:{
        push(pathname){
          window.history.pushState({},null,pathname);
          // 还要更新状态中的路径
          that.handleChangeState(pathname);
        }
      }
    }
    return <Provider value={value}>
      {this.props.children}
    </Provider>
  }
}
```
`window.history.pushState({},null,pathname)参数意义，window.addEventListener('popstate',()=>{
      let pathname = window.location.pathname;
      this.handleChangeState(pathname);
    },false);`

> Route主要实现的功能
* 利用BrowserRouter传过来的pathname，拿到此时的路径
* 利用path-to-regexp对props.path进行匹配，若匹配，则返回component对应的组件，否则返回null
* 将{match：{params}}传递给子组件
```javaScript
import React from 'react';
import {Consumer} from './context';
import pathToRegExp from 'path-to-regexp';
// 组件不是通过route渲染出来的是没有这三个属性的
export default class Route extends React.Component{
  render(){
    return <Consumer>
      {(value)=>{
        console.log('--------------')
        let {pathname} = value.location; // 请求来的路径
        let {path='/',component:Component,render,exact=false} = this.props; // Route上的路径
        let keys = []; // ['id']
        let reg = pathToRegExp(path,keys,{end:exact});
        // 看路径是否能匹配
        if(reg.test(pathname)){
            let result = pathname.match(reg); // 匹配结果
            let match = {}
            if(result){
              let [,...arr] = result;
              console.log(keys)
              match.params = keys.reduce((memo,next,idx)=>{
                memo[keys[idx].name]=arr[idx]
                return memo;
              },{});
            }
            let props = {
                ...value,match
            }
           // if(Component){
              return <Component {...props}></Component>
            // }else if(render){
            //   return render(props);
            // }else{

            // }
          
        }else{
           return null
        }
        
      }}
    </Consumer>
  }
}
```
`应注意path-to-regexp用法，pathToRegExp(path,keys,{end:exact})参数`

> Link的主要功能
* 调用BrowserRouter传过来的history.push,参数为this.props.to
```javaScript
import React from 'react';
import {Consumer} from './context';
export default class Link extends React.Component{
  render(){
    return <Consumer>
      {({history})=>{
          return <a onClick={()=>{
            history.push(this.props.to)
          }}>{this.props.children}</a>
      }}
    </Consumer>
  }
}
```
> Switch
* 获取到pathname
* 获取到children,进行循环比较其path与pathname，若匹配，则返回该child
```javaScript
import React from 'react';
import {Consumer} from './context';
import pathToRegExp from 'path-to-regexp';
// 把儿子拿出来 和路径比 只要比一个发现相等，直接返回即可
export default class Switch extends React.Component{
  render(){
    return <Consumer>
      {(value)=>{
        // 父级存放的
        let pathname = value.location.pathname;
        let children = this.props.children;
        console.log(children.length)
        // for(let i = 0;i<children.length;i++){
        //   let child = children[i];
        //   let {path='/',exact=false} = child.props;
        //   let reg = pathToRegExp(path,[],{end:exact});
          
        //   if(reg.test(pathname)){
        //     return child    
        //   }
        // }
        return null;
      }}
    </Consumer>
  }
}
```
`注意若一个子组件时，children为一个对象，否则为一个数据`

> Redirect
* 将props.to的路径push到history
```javaScript
import React from 'react';
import {Consumer} from './context';
export default class Redirect extends React.Component{
  render(){
    return <Consumer>
      {({history})=>{
          history.push(this.props.to);
          return null
      }}
    </Consumer>
  }
}
```



