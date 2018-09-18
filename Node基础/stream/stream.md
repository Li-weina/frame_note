### 检测一个对象是否是流
```javaScript
let stream = require('stream')
let fs = require('fs')
let events = require('events')
let rs = fs.createReadStream('1.txt')
let st = new stream()
console.log(st instanceof events) //stream继承了events
console.log(rs instanceof events) //说明rs是一种流

//目前来看 rs -> stream -> events
//继承关系
```

### 一、实现自定义可读流
> 文件流才会有open 对于自动的可读流没有这个监听，但有data、end、error
```javaScript
let {Readable} = require('stream')

class RS extends Readable{ //1.继承Readable
  constructor(){
    super()
    this.index = 9
  }
  _read(){// 2.重写_read方法
    while(this.index >0){
      this.push(this.index+'') // 要写有传出去的数据需要push
      this.index--
    }
    this.push(null) //遇到push为null时说明传输结束
  }
}

let rs = new RS()
rs.on('data',(data)=>{
  console.log(data.toString())
})

rs.on('end',()=>{
  console.log('end')
})

//当然对于可读流，除了监听data，还可以监听readable，定数获取返回的数据
rs.on('readable',()=>{
  let r = rs.read(1)
  console.log(r.toString())
})
```

### 二、自定义可写流
```javaScript
let {Writable}  = require('stream')
let fs = require('fs')
class WS extends Writable{ //可读流继承的writable
  _write(chunk,enconding,callback){ //重写_write方法
    fs.appendFileSync('12.txt',chunk) //该部分可以写自己的逻辑
    callback() //执行回调，才会清除缓存，执行下一个函数
  }
}
let ws = new WS()
let flag = ws.write('1','utf8')
console.log(flag)
ws.write('1','utf8')
ws.end('hello')
```
### 三、实现双工流
```javaScript
//重写了_read和_write两个方法
let {Duplex} = require('stream')
let fs = require('fs')
class DB extends Duplex{
  _read(){
    this.push('hello')
    this.push(null)
  }
  _write(chunk,enconding,callback){
    fs.writeFileSync('12.txt',chunk)
    callback()
  }
}

let db = new DB()
db.on('data',(data)=>{
  console.log(data.toString())
})
db.write('he','utf8')
```
### 四、转化流
```javaScript
let {Transform} = require('stream')
class TS extends Transform{//继承Transform
    _transform(chunk,encoding,callback){//作为可写流
        this.push(chunk.toString().toUpperCase()) //作为可读流
        callback()//不要忘了回调
    }
}


let ts = new TS()
// process.stdin.on('data',(data)=>{
//   console.log(data.toString())
// })
process.stdin.pipe(ts).pipe(process.stdout)
// process.stdin是可读流 、 process.stdout是可写流
```