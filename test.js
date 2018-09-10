function say(){
    console.log('say')
}
function Parent(){
    this.name = {name:'zf'}
    say()
}
Parent()
Parent.prototype.eat = function(){
    console.log('eat')
}
parent = new Parent()
console.log(parent)
function Child(){
    Parent.call(this)//私有
}
Child.prototype = Object.create(Parent.prototype,{constructor:{value:Child}})
let child = new Child()
child.eat()
// Object.setPrototypeOf(Child.prototype,Parent.prototype)//公有
// Child.prototype.__proto__ = Parent.prototype

console.log(child.constructor)


function myCreate(parentPrototype){
    function Fn(){}
    Fn.prototype = parentPrototype
    return new Fn()
}

Array.prototype.myReduce = function(cb){
    let prev = this[0];
    for(let i=0;i<this.length-1;i++){
        prev = cb(prev,this[i+1],i+1,this)
    }
    return prev
}

let a = [2,34].myReduce(function(prev,next){
    return prev+ next
})
console.log(a)

class Parent {
    constructor(){
        this.name = 'le'
    }
    eat(){
        console.log('eat')
    }
}
let parent = new Parent()