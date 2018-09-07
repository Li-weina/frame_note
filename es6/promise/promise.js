let resolvePromise = (promise2,x,resolve,reject)=>{
   
    if(promise2 === x) return new Error('TypeError: Chaining cycle detected for promise');
    if(x !== null && (typeof x ==='object' || typeof x ==='function')){
        console.log('1')
        try{
            let then  = x.then;
            if(typeof then === 'function'){
               
                then.apply(x,(y)=>{
                    console.log(y)
                    resolvePromise(promise2,y,resolve,reject)
                },(err)=>{
                    reject(err)
                })
            }
        }catch(e){
            reject(e)
        }
     
    }else{
        console.log('2')
        resolve(x)
    }
}
class Promise{
    constructor(executor){

        this.state = 'pending';
        this.reason = null;
        this.value = null;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = []
        let resolve = (value) => {
            if(this.state === 'pending'){
                this.state = 'resolve';
                this.value = value;
                this.onResolvedCallbacks.forEach((fn,index)=>{
                    fn(value)
                })
            }
        };
        let reject = (reason) =>{
            if(this.state === 'pending'){
                this.state = 'reject';
                this.reason = reason;
                this.onRejectedCallbacks.forEach((fn,index)=>{
                    fn(reason)
                })
            }
        }
        try{
            executor(resolve,reject)
        }catch(e){
            console.log('e'+ e)
        }
    }
    then(onFulfilled,onRejected){
        let promise2;
         promise2 = new Promise((resolve,reject)=>{
            if(this.state === 'resolve'){
                let x = onFulfilled(this.value)
                resolvePromise(promise2,x,resolve,reject)
            }else if(this.state === 'reject'){
                let x = onRejected(this.reason)
                resolvePromise(promise2,x,resolve,reject)
            }else if(this.state === 'pending'){
                this.onResolvedCallbacks.push(()=>{
                    let x = onFulfilled(this.value)
                resolvePromise(promise2,x,resolve,reject)
                })
                this.onRejectedCallbacks.push(()=>{
                    let x = onRejected(this.reason)
                resolvePromise(promise2,x,resolve,reject)
                })
            }
        })
        return promise2

    }
    static resolve(val){
        return new Promise((resolve,reject)=>{
            resolve(val)
        })
    }
    static reject(reason){
        return new Promise((resolve,reject)=>{
            reject(reason)
        })
    }
}

module.exports = Promise
