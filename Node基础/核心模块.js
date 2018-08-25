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

