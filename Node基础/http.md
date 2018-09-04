## req.url
```javaScript
let http = require('http')
let url =  require('url')
let server = http.createServer((req,res)=>{
    let str = 'http://www.baidu.com:80/index.js?age=7&name=li#8'
    console.log(url.parse(str))
    res.end('ok')
})
server.listen(3000)

//Url {
//   protocol: 'http:',
//   slashes: true,
//   auth: null,
//   host: 'www.baidu.com:80',
//   port: '80',
//   hostname: 'www.baidu.com',
//   hash: '#8',
//   search: '?age=7&name=li',
//   query: 'age=7&name=li',
//   pathname: '/index.js',
//   path: '/index.js?age=7&name=li',
//   href: 'http://www.baidu.com:80/index.js?age=7&name=li#8' }
```
> 基本可归纳为href -> protocol + slashed + host(hostname + port) + path(pathname + search('?' + query)) + hash
> 但要注意真正请求过来时，无法获取到host，只能获得path相关信息（如下），若想获得host可通过req.headers.host
```javaScript
// Url {
//   protocol: null,
//   slashes: null,
//   auth: null,
//   host: null,
//   port: null,
//   hostname: null,
//   hash: null,
//   search: '?age=7',
//   query: 'age=7',
//   pathname: '/index.js',
//   path: '/index.js?age=7',
//   href: '/index.js?age=7' }

```