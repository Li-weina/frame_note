## file system 文件系统 
> node 为处理文件而出的模块，一般都有同步和异步两种，因为try catch不能捕捉回调函数中错误，所以回调中有专门处理错误的参数

### 整个文件的读取操作，读取后的文件存放在内存中
1. readFile readFileSync标准参数 path,objects(encoding,flag),callback
```javaScript
let fs = require('fs')
let path = require('path')
fs.readFile(path.resolve(__dirname,'note.md'),{encoding:'utf8',flag:'r'},function(err,data){
    console.log(data)
})

let f = fs.readFileSync(path.resolve(__dirname,'note.md'),{encoding:'utf8',flag:'r'})

console.log(f)

```
2. writeFile writeFileSync标准参数 path,data,objects(encoding,mode,flag),callback  mode认为0o666
```javaScript

fs.writeFileSync(path.resolve(__dirname,'1.txt'),'hello world',{flag:'w'})

fs.writeFile(path.resolve(__dirname,'2.txt'),'nono',{flag:'a'},function(err){
    console.log(err)
},)
```
`flag常用值：r 读取，文件不存在会报错，w 写入文件，不存在则创建，若存在则清空，a 追加写入，不存在则创建，存在则追加.mode权重 ：r 4  w 2 e 1 ，-为文件，d为文件夹，三组分别为文件所有者，文件所属组其他用户`

3. appendFile appendFileSync 由writeFile实现

```javaScript
fs.appendFile(path.resolve(__dirname,'2.txt'),'okkok',function(err){
    console.log(err)
})
```

> 小文件还可，大文件如何分批读取写入，并可自己选择从哪儿读取，读取几个，这就产生下面的api (读取、写入、边读边写)
1. fs.read
2. fs.write
3. fs.open
4. fs.close
5. fs.fsync
```javaScript
//fd是文件描述符，因为process.stdin process.stdout,process.stderr占用了0、1、2,故fd从3开始
fs.open(path.resolve(__dirname,'2.txt'),'r',function(err,fd){
    let buffer = Buffer.alloc(8)
    //fs.read参数中没有文件路径一项，只有fd代表哪个文件
    // buffer读取到的文件保存到哪里
    // 0 在buffer中从第几位开始保存
    // 5 在buffer中保存几位
    // 2 在fd文件中从第几位开始读取
    // btyesRead 从fd文件中实际读取到的数量，例如在buffer保存100,但文件中只有20个，则bytesRead的值为20
    fs.read(fd,buffer,0,5,2,function(err,bytesRead){
        console.log(bytesRead)
        console.log(buffer.toString())
    })
})
//5
//nonon   
```

> 异步的回调切记next ()

### 流

#### 二、可写流

> 该方法领悟：对同一文件进行多个异步操作时，可考虑将其缓存起来
```javaScript
let fs = require('fs')
let path = require('path')

let ws = fs.createWriteStream('10.txt',{
    flags:'w',
    encoding:'utf8',
    mode:0o666,
    autoClose:true,
    start:0,
    highWaterMark:3,//预估占有的字节数
})
// 只有第一个写入时是真正的写入，其他进入缓存，否则你说写这个，他说写那个，就都乱了
// 每次写入都会返回一个值，若写入的字节大于highWaterMark 该值为false，否则就true
//当内存那种所有数据(不管超没有超预期的)都写完后，并且 写入的字节大于highWaterMark，那么就会触发drain，二者缺一不可，写完了但没超过，或者超过了但还没写完都不可以，此方式不会调用on('close')
//写完后会清除内存

//write内容只能是字符串或者buffer

//ws.end 会将缓存区的内容全部清空，触发end事件后不再会触发drain事件 且之后不能再写入，并将参数下入到文件中,同时触发on('close')关闭流,切记没有没有没有on('end')

// let flag1 = ws.write('12',(err)=>{})
// let flag2 = ws.write('12',(err)=>{})
// let flag3 = ws.write('12',(err)=>{})
// // ws.end('hello')
// console.log(flag1,flag2,flag3)
// ws.on('drain',()=>{
//     console.log('干了')
    
// })

// let flag4 = ws.write('12',(err)=>{})
// console.log(flag4)
let i = 9;
function writeTo(){

    let flag = true;
    while(i >0 && flag){
        flag = ws.write(i-- +'')

    }
}
writeTo()
ws.on('drain',()=>{
    writeTo()
    console.log('gan')
})

```