let fs = require('fs')
let path = require('path')
// let r = fs.readFileSync(path.join(__dirname,'核心模块.js'),'utf8')
// console.log(r)
// let s = fs.existsSync(path.join(__dirname,'fs.js'))
// console.log(s)
// fs.accessSync(path.join(__dirname,'核心模块.js'))
fs.statSync(path.join(__dirname,'fs.js'))

//path


console.log(path.join(__dirname,'text.html','/'))
console.log(path.resolve('text.html','/a'))
console.log(path.basename('1.a.mac.js','a.mac.js'))//读取文件名
console.log(path.extname('1.a.mac.js'))//读取文件扩展符
console.log(path.dirname(path.join(__dirname)))//读取父级目录
let a = 1;
let vm = require('vm')
let str = 'let a = 3;console.log(a)'
vm.runInThisContext(str)
vm.runInThisContext(str)

let a = 2
eval('console.log(a)')

let a = 3;
let str = 'console.log(a)'
let fn = new Function('a',str)
console.log(fn(4))

console.assert(1==3,'no')
let assert = require('assert')
// assert(1===2,'e')
console.log('c')

let a = {name:'le',fn:function(){
    console.log('fn')
}}
let b = {age:8}
let c = {...a,...b}
let d = Object.assign(a,b)
console.log(d)
let a = {name:'le',fn:function(){
    console.log('fn')
}}
let e = JSON.parse(JSON.stringify(a))
console.log(e)


function deepClone(obj){
    if(typeof obj !== 'object') return obj;
    if(obj instanceof RegExp) return new RegExp(obj)
    if(obj instanceof Date) return new Date(obj)
    let newObj =new obj.constructor()
    for(let key in obj){
        newObj[key] = deepClone(obj[key])
    }
    return newObj
}

let obj = {
    name:'li',
    ary:[1,2,3],
    list:{
        age:'3'
    },
    fn:function(){
        console.log('fn')
    }
}
let obje = JSON.parse(JSON.stringify(obj))
obj.list.age= 8
console.log(obje)

let obj1 = {
    number:0
}

function observe(obj){
    for(let key in obj){
        defineReactive(obj,key,obj[key])
    }
}
function defineReactive(obj,property,value){
    Object.defineProperty(obj,property,{
        get(){
            return value
        },
        set(newVal){
            console.log('update')
            value = newVal
        }
    })
}
observe(obj1)