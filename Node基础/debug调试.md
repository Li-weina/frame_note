## node debugger调试
> 可以参考原文<http://nodejs.cn/api/debugger.html>

### 一、终端调试
```
node inspect filename
```
终端会出现如下内容
```
< Debugger listening on ws://127.0.0.1:9229/1cf7bae2-af1a-4eed-9c32-4502582b2836
< For help, see: https://nodejs.org/en/docs/inspector
< Debugger attached.
Break on start in fs.js:1
> 1 (function (exports, require, module, __filename, __dirname) { //  async function a(params) {
  2 //     let r = await b()
  3 //     console.log(r)
debug> 
```
输入n,向下走一步
```
debug>n
break in fs.js:12
 10 // }
 11
>12 let a = 2;
 13 let b = 3;
 14 function sum(a,b){
```
常用命令
* cont, c - 继续执行。
* next, n - 下一步。
* step, s - 跳进函数。
* out, o - 跳出函数。
* pause - 暂停运行代码（类似开发者工具中的暂停按钮）。

断点
* setBreakpoint(), sb() - 在当前行设置断点。
* setBreakpoint(line), sb(line) - 在指定行设置断点。
* setBreakpoint('fn()'), sb(...) - 在函数体的第一条语句设置断点。
* setBreakpoint('script.js', 1), sb(...) - 在 script.js 的第 1 行设置断点。
* clearBreakpoint('script.js', 1), cb(...) - 清除 script.js 中第 1 行的断点。

信息
* backtrace, bt - 打印当前执行框架的回溯。
* list(5) - 列出脚本源代码 5 行的上下文（前后各 5 行）。
* watch(expr) - 添加表达式到监视列表。
* unwatch(expr) - 从监视列表移除表达式。
* watchers - 列出所有监视器和它们的值（每个断点会自动列出）。
* repl - 打开调试器的 repl，用于在所调试的脚本的上下文中进行执行。
* exec expr - 在所调试的脚本的上下文中执行一个表达式。

执行控制
* run - 运行脚本（调试器开始时自动运行）。
* restart - 重新启动脚本。
* kill - 终止脚本。

### 二、Node.js的V8检查器集成
```
node --inspect-brk filename
```

打开chrome://inspect
会出现如下内容<br>
![图](/Users/lena/Desktop/1.png)

点击inspect
进入一个编辑窗口，如图：
![图]()
和其他调试一样，选中某个变量点击右键会做出更多操作

### 三、vscode 自带调试
直接在代码里打断点，然后点击小蜘蛛。如果不可调式（调试按钮置灰）,可点击设置小齿轮，
```
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "program": "${workspaceFolder}/fs.js"
        },
```
> fs.js的位置替换成想要调试的文件即可

面板中一些模块
* local 调试位置所在的作用域
* watch 监视的变量
* breakpoints 断点位置