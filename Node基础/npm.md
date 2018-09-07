- 本地安装
- 全局安装 (在命令行使用)

```
npm install http-server -g 生成静态目录 
npm install nrm -g 切换源
npm install yarn -g 除了npm 还有安包的方式 yarn
npm uninstall yarn -g
```

## 实现全局包
- 添加bin
- 添加#! /usr/bin/env node (你想要你的这个文件中的代码用什么可执行程序去运行它)
- npm link<br>
`!/usr/bin/env node这种用法是为了防止操作系统用户没有将node装在默认的/usr/bin路径里。当系统看到这一行的时候，首先会到env设置里查找node的安装路径，再调用对应路径下的解释器程序完成操作`
## 发包
- 切换到官方源
- npm addUser
- 填上用户名邮箱 密码
- npm publish