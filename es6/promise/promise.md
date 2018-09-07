## promise
### 解决的问题
* 解决回调地狱 恶魔金字塔
* 同步返回值
### 注意事项
* 传入参数executor直接执行，且其具有两个参数，resolve,reject
* 三种状态，pending,reslove,reject
* 只能从pending到reslove  或pending到reject
* 有then方法，且其具有两个函数参数onFulfilled，onRejected
* 如果 executor 报错，则会作为参数传给onRejected
* 如果onFulfilled，onRejected返回常量则作为参数传递个下个then 的onFulfille；报错则传递给onRejected；
`若返回仍是promise且reslove，则将最终值传给onFulfilled,如果遇到reject，则将reject(即使返回值仍是Promise)参数全部传递给onRejected`
* then方法可以穿越
* catch方法

async await
* await 后面是普通函数，则将其返回值赋予等号前面变量，若是常量则直接赋值；若是promise ，resolve参数赋予前面变量
```javaScript
function test(){
    console.log(3)
    return '4'
}

async function fn(params) {
    let a = await test()
    console.log(a)
}
fn()
//4
```
* 只要async函数有返回值时，then的onFullfiled参数才会有值
* 若promise是reject,则会将结果传给onFullfiled
* 可以用try catch处理reject和报错问题,错误不会再传到then的onRejected,且相当于fn返回值为undefined，传至onFullfiled

```javaScript
async function fn(params) {
    try{
        let a = await Promise.reject('no')
        console.log(a)
    }catch(e){
        console.log(e)
    }

}
fn().then((data)=>{
    console.log('data'+data)
},(err)=>{
    console.log('err'+err)
})

//eno
//dataundefined
```

* 如返回值就是promise，则直接将结果传递过then的两个参数