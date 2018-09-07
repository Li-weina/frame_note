let Promise = require('./promise');
let p = new Promise((resolve,reject)=>{
    resolve('ok')
    // setTimeout(()=>{
    //     reject('ok')
    // },1000)
   
})
p.then((data)=>{
    console.log('suc' + data)
    return new Promise((resolve,reject)=>{
        resolve('we')})
}).then((data)=>{
    console.log('data '+data)
},(err)=>{
    console.log('err '+err)
})

// ,(err)=>{
//     console.log('err'+err)
// }).then((data)=>{
//     console.log('data2 '+ data)
// },(err)=>{
//     console.log('err2 '+ err)
// })