## decorator
### 修饰类的

```javaScript
@myFunction('person')
class Person {
    @readOnly PI = 3.1415926
    @decoratorMy 
    my(){console.log('run')}
}
function myFunction(value){
   return function (target){
       //target的是Person这个类
    target.myName = 'zfpx1';
   }
}
function decoratorMy(target,key,descriptor){
    // 如果修饰的是方法，第一个参数是Person.prototype
    //arguments 打印结果：
//     [Arguments] {
//   '0': Parent {},
//   '1': 'eat',
//   '2':
//    { value: [Function: eat],
//      writable: true,
//      enumerable: false,
//      configurable: true } }
    let fn = descriptor.value;
    descriptor.value = function(){ // 装饰模式
        console.log(key+'调用');
        fn();
    }
}
function readOnly(target,key,descriptor){
    descriptor.writable = false; // 不支持改写
}
let person = new Person();
// person.PI = 4;
console.log(person.my());
```

### 同时有两个修饰器时
```javaScript
function desc(id){
    console.log('out'+id);
    return function(target,key,descriptor){
        console.log('inner'+id);
    }   
}
// 洋葱模型 compose方法 redux koa
class My{
    @desc('1')
    @desc('2')
    my(){}
}
//out 1
// out 2
// inner 2
// inner 1
```
`修饰器可以修饰类、公有方法、实例属性。需要注意的是，参数分别是什么，以及两个修饰器同时修饰时为洋葱模型`