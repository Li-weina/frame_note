## http
### 一、http和tcp的区别
```javaScript
let http = require('http')
let server = http.createServer() 
// server.on('connection',(socket)=>{
//     // console.log(socket)
//     socket.setEncoding('utf8')
//     socket.on('data',(data)=>{
//         console.log(data)
//     })
// })

server.listen(3000)


```
> 对于http起的服务,监听的connection，不能再用socket监听data ,否则会报错
![图](../../images/http_error1.png)
http在内部将socket分成可读流req，可写流res，并emit('request',req,res),所以对于http起的服务，我们监听request即可

### 二、浏览器访问服务和curl的区别
> 浏览器访问时 headers好多内容
```javaScript
let http = require('http')
let server = http.createServer()
server.on('request',(req,res)=>{
    console.log(req.method)
    console.log(req.url) //显示path内容 /index/list?b=8 哈希值不会获取到
    console.log(req.httpVersion)
    console.log(req.headers)
    req.on('data',(data)=>{
        console.log(data)
    })
})
server.listen(3000)
//curl 访问时 打印： curl -v localhost:3000
// GET
// /
// 1.1
// { host: 'localhost:3000',
//   'user-agent': 'curl/7.54.0',
//   accept: '*/*' }


// 浏览器 访问时 打印：localhost:3000
// GET
// /
// 1.1
// { host: 'localhost:3000',
//   connection: 'keep-alive',
//   'cache-control': 'max-age=0',
//   'upgrade-insecure-requests': '1',
//   'user-agent':
//    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
//   accept:
//    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
//   'accept-encoding': 'gzip, deflate, br',
//   'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
//   cookie:
//    'Webstorm-5cf4dd14=43ffab86-857a-4f24-8889-bf29bbaec9e0; _ga=GA1.1.1248251848.1504602579; Idea-95ea05cf=64cd4c99-1381-45dc-a621-46a3373c4000; io=xNNSRR1FeHpJ7cVgAAAA; Webstorm-5cf4d953=50a18b62-c7bd-4fc4-a51a-329f7112b686' }

```
> 只要post时，才会触发data事件,application/x-www-form-urlencoded  是默认type，--data为a=3和{a:3}都原样打印

```javaScript
//curl -X POST -v --header "a:1" --data "a=3" http://localhost:3000

//curl -X POST -v --header "a:1" --data "{a:3}" http://localhost:3000
POST
/
1.1
{ host: 'localhost:3000',
  'user-agent': 'curl/7.54.0',
  accept: '*/*',
  a: '1',
  'content-length': '3', //多了两个字段
  'content-type': 'application/x-www-form-urlencoded' }
a=3
//{a:3}

```