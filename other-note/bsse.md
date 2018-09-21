```javaScript

let a = {
a.name = 'lean'
a.stu['age'] = 8
console.log(a)
//这样是不行的，只能给已经存在的对象加属性和赋值

let a = {stu:{}}
a.name = 'lean'
a.stu['age'] = 8
console.log(a)
```