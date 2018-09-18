## tcp

### 1. 核心模块net集成了tcp服务
> 创建一个服务
```javaScript
let net = require('net')
let server = net.createServer()
server.on('connection',(socket)=>{
    socket.setEncoding('utf8')
    socket.on('data',(data)=>{
        console.log(data)
    })
    socket.write(`
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 2

ok
    `) //想返回数据，需要根据识别浏览器的暗语，也就是相应行 、相应头、相应体，浏览器才能识别并展示在页面上
})
server.on('error',(error)=>{
    if(error.code == 'EADDRINUSE'){
        server.listen(3001)
    }
})
server.listen(3000)
```
### 2. 常用api
```javaScript
let net = require('net')
let server = net.createServer()
server.on('connection',(socket)=>{
    socket.setEncoding('utf8')
    server.getConnections((err,count)=>{//获取连接数 count显示当前第几个连接的
        socket.write(`最大连接数是${server.maxConnections},您当前是第${count}位`)
        socket.on('data',(data)=>{
            data = data.replace('\r\n','')
            console.log(data)
            //socket.end() // 当前客户端立即关闭，其他客户端不受影响,服务端也不受影响
            //以下两种方式是服务端关闭
            //server.close() //1、已经打开的不受影响，再新连接的，则不能再连接，并且当所有已连接的窗口都关闭时，才会触发close事件,也就是服务彻底关闭
            server.unref()//2、连接时正常连接，直到最大限数，但当所有连接都断开时，服务彻底关闭，不能再连接, 注意此方法不会触发close事件
        })

    })


})
server.on('close',()=>{
    console.log('close')
})
server.maxConnections = 3 //设置最大连接数
server.listen(3000)
```