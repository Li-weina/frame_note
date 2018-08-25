## node event loop
 目前考虑的就是 
 * timer （setTimeout setInterval），
 * i/o操作，
 * check阶段的seImmediate

 ### 首先要确定下这三个阶段的顺序

1.文件里只有setTimeout（且时间设置为0） 和setImmediate

```javaScript
setTimeout(() => {
    console.log('setTimeout')
}, 0);
setImmediate(function(){
    console.log('seimmediate')
})
```
> 这种情况打印的先后顺序是不确定的，主要是该文件准备需要消耗一定时间，如果大于4,当遇到setTimout的时候，就直接执行，之后是setImmediate。如果消耗时间小于4,则setTimeout还未到执行时间,执行check阶段的setImmediate，到了4,再去执行setTimeout

2.文件里有setTimeout fs，和setImmediate
```javaScript
setInterval(() => {
    console.log('setTimeout')
}, 3);


var n = Date.now()
fs.readFile('work.html',function(){
    var fileTime = Date.now() - n
    // console.log(fileTime)
    // console.time('start')
    // for(let i =0;i<100;i++){
    //     console.log('no')
    // }
    // console.timeEnd('start')
    console.log('fs')
    
})

setImmediate(function(){
    console.log('setImmediate')
})
```
> 现在我们把其中的两个静态值改为动态值，方便大家理解。time：定时器的时间（本文件是3），fileTime是读取work.html的时间,stackTime指同步代码执行需要时间<br>
 代码的执行顺序和time大小和file大小有关<br>
 * time < stackTime时（time=0时），栈里内容执行完后，清空timer阶段队列，然后执行i/o的读取，但发现下面有check阶段，则优先check<br>
 故打印顺序为 setTimeout 、setImmediate、fs
 * time > stackTime && time < fileTime时,还没有到时间的定时器，timer队列为空，直接走i/o的读取，但发现下面有check阶段，则优先check，之后继续读取文件，期间检查到有到时间的定时器，则会优先执行timer,之后继续读取文件，读完之后，执行callback<br>
 故打印顺序为 setImmediate、setTimeout、fs

 * time > stackTime && time > fileTime时,还没有到时间的定时器，timer队列为空，直接走i/o的读取，但发现下面有check阶段，则优先check，之后继续读取文件，期间没有到时间的定时器，执行callback，只有callback执行完之后（期间即使有到时间的定时器，也不会去执行），才会再去执行到时间的定时器。<br>
 故打印顺序为setImmediate、fs、setTimeout

 * `小总结：fs分为两个阶段，一是读取阶段，二是callback执行阶段。当在读取阶段，其优先级最小，会让给其下个check阶段,期间会让给time阶段，但一旦读取文件结束，开始执行callback,则优先级增大，不会让给time阶段`

### 上面讲到的都不包括有微任务的情况，node 里的微任务包含promise.then()，和process.nextTick()
> 微任务是在栈执行完，清除微任务，再进入宏任务，清除完一个宏阶段，进入下个宏阶段前，清除微任务，再进入下一个宏阶段，宏阶段的顺序就是上面降到的顺序<br>
`需要注意的是，process.nextTick()在promise.then()之前执行`

### 来考验下大家，下面代码如何打印
```javaScript
fs.readFile('work.html',function(){
    setTimeout(() => {
        console.log('setTimeout2')
        // for(;;){}
    }, 0);
    setImmediate(function(){
        console.log('setImmediate2')
    })
})
```

> 揭晓答案，只有setImmediate2、setTimeout2 一种结果，不会像文件里只有setTimeout和setImmediate一样，因为，i/o操作完之后，下一个叫阶段是check，所有结果不会是随机的