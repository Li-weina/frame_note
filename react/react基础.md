## react 基础
* react：用react 方法
* react-dom ：操作dom
* render():第一个参数可以为：
```javaScript
let el = <h1 name="zfpx">hello <span>world</span></h1>
render(el,window.root)

let ary = [1,2,3]
render(ary,window.root)

function Counter(props){
    return (
        <div>{this.props.number}</div
    )
}
render(<Counter number="1"/>,window.root)

class Counter extends Component{
    //如果写上constructor，则必须带上props参数
    // constructor(props) { 
    //     super();
    // }
    // 否则就不写，给类上加属性，直接：
    // state = {
    //     number:1
    // }
    render(){
        return (
            <div>this.props.number</div>
        )
    }
}
let obj = {
    number:'3'
}
render(<Counter {...obj}/>>)

```
* setState 会重新调用render函数，处理异步的方法
```javaScript
    // setState 批量更新 setState是同步还是异步
    // this.setState({ num: this.state.num + 1 },function () {
    //   this.setState({ num: this.state.num + 1 },function () {
    //     this.setState({ num: this.state.num + 1 });
    //   });
    // });
    //可以简写为：
    this.setState((prevState)=>({num:prevState.num+1}));
```
* props传入参数类型的限制，需要引入'prop-types'包
```javaScript
class Person extends Component {
    //如果没传入某个属性，可以用默认值
  static defaultProps = {
    name: 'zfpx'
  }
  //对props进行校验
  static propTypes = { // 用来校验的
    name: PropTypes.string.isRequired,
    gender: PropTypes.oneOf(['男', '女']),
    hobby: PropTypes.arrayOf(PropTypes.string),
    pos: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired
    }),
    salary(obj, key, p) { // 自己校验
      if (obj[key] <= 3000) {
        throw new Error('工资太低了');
      }
    }
  }
  render() {
    let { name, age, hobby, pos, salary } = this.props
    return (<div>
      {name} {age}
    </div>)
  }
}
// 属性校验
let obj = {
  age: 9,
  gender: '男',
  hobby: ['游泳', '跑步'],
  pos: { x: 433, y: 822 },
  salary: 6000
}
ReactDOM.render(<Person {...obj}></Person>, window.root)
```
* 在虚拟dom中调用实例上方法的办法：箭头函数、bind this、es7的写法，以保证方法中的this指向实例

