## 分布式
> 把一个功能拆分出若干个部分

## 集群
> 多个功能一样 （多进程）

## 讲解这些之前需要了解基础知识：

 - node 默认是单线程 如果主线程挂了，会导致node退出。基于这个原因，我们可以开启多个子进程（多进程）

- <font color="red">在主线程中才能开子线程</font>

- <font color="red">为了有效利用cpu，一般情况下会开 内核数 - 1 个子进程</font>

现在问题是？
* 如何实现多集群，也就是在主线程中如何建子进程
* 集群之间如何通信

首先要了解下，node中process的基础知识，负责着进程的写入和读出

```
process.stdin  0(文件描述符)
process.stdout 1
process.stderr 2
```
好，下面就是代码来实现

## 一、spawn
```JavaScript
let spawn = require('child-process');
let child = spawn('node',['1.spawn.js'],{
    cwd:path.join(__dirname,'test'),
    // 所有的输出都和父进程共享，但是父进程无法拿到子进程的输出 0 代表process.stdin,1 代表process.stdout,2代表process.stderr
    stdio:[0,1,2],
    //或者
    stdio:[process.stdin,process.stdout,process.stderr]


    //或者 通信方式：
    //process.stdin.write('ok') 和child.on('data',(data)=>{console.log(data)})
    stdio:['pipe','pipe','pipe']  //'pipe'（简写）

    //或者 通信方式：
    //process.send('ok')和child.on('message',(data)=>{console.log(data)})
    stdio:['ingnore','ingnore','ingnore'，'ipc']

    //当然也可以混着用 <font color="red>fd可以直接fd.write('no')</font>
    stdio:['ignore','pipe',fd,'ipc']
})
```

若如果想主进程什么都不做，都让子进程去做
```JavaScript
let child = spawn('node', ['3.write.js'], {
    stdio: 'ignore',
    detached:true, //父亲说你自己独立去
    cwd: path.resolve(__dirname, 'test')
})
child.unref(); //儿子，好我自己独立，作为回应。千万不要忘记
```

## 二、fork
> 除了spawn还有基于他封装的fork,默认通信方式有ipc,且不需写'node'参数，['a']里的内容才是真正的参数，可通过process.argv获取到

```JavaScript
// 基于spawn 封装的
let {fork} = require('child_process');，
let path  =require('path');
let child = fork('4.fork.js',['a','b'],{
    cwd:path.resolve(__dirname,'test'),
    silent:false //是否要和子进程进行通信
});

// 主进程
let http = require('http');
let server = http.createServer(function(req,res){
    res.end('父'+process.pid+'');
});
server.listen(3000);

child.send('server',server)
```

4.fork.js文件的内容

```JavaScript
let http = require('http');
let os = require('os');
console.log(os.cpus().length-1)

process.on('message',function(data,s){
    if(data === 'server'){
        for(let i = 0;i<os.cpus().length-1;i++){
            console.log('xxx')
            http.createServer(function(req,res){
                res.end('子:'+process.pid+'');
            }).listen(s);
        }
    }
})
```
<font color="red">需要注意的内容：</font>
* 获取内核数的方法

```
let os = require('os');
console.log(os.cpus().length-1)
```
* 主线程的server可以传递到child process里，例如代码中的s

## 三、cluster
> 有没有感觉很麻烦，主进程和子进程要分别写在不同文件里，现在福音来了。那就是cluster，帮我们可以把他们两者写在一起文件里

```javaScript
// 子进程 父进程 cluster 可以把子继承和父进程写到一个文件里

let cluster = require('cluster'); // 帮我们开启多个进程
let http  =require('http');
let os = require('os');
let path = require('path')

if(cluster.isMaster){
    // 在主进程中fork子进程
    // 主进程的内容
    console.log(cluster.isMaster)
    for(let i = 0; i<os.cpus().length;i++){
        console.log('1')
        cluster.fork(); // 就是会开一个新的子进程
    }
}else{
    // 子进程的内容
    http.createServer(function(req,res){
        console.log('2')
        res.end(process.pid+':child')
    }).listen(3000);
}
```

有没有更简单的方式，或者说更少的代码来实现，这里可以有,哈哈

```javaScript
cluster.setupMaster({
    exec: path.join(__dirname,'worker.js'),
})
for(let i = 0; i<os.cpus().length;i++){
    cluster.fork(); // 就是会开一个新的子进程
}
```
worker.js
```javaScript
let http  =require('http');
http.createServer(function(req,res){
    res.end(process.pid+':child')
}).listen(3000);
```

## 补充：exec
> exec是不是有点陌生，别急，我们来认识一下他。执行

```javaScript
let {exec,execFile} = require('child_process');

exec('node -v',function(err,data){
    console.log(data);
})
execFile('node',['-v'],function(err,data){
    console.log(data);
})
```

> 总结一下：实现集群，学会cluster的用法即可，可能你会说那刚开始讲那么多废话，俺想说的是，那些是帮助理解cluster的原理的，用起来更得心应手哦。是不是对集群有点初步的认识了。嘻嘻。除了这些我们可以总结到从原生`child-process`模块里，我们学到了`spawn`,`fork`,`exec`,`execFile`方法，记住`cluster`本身就是原生的哦。`spawn`里有`dispatch`和`child.unref`;`fork`里有`slient:true`
