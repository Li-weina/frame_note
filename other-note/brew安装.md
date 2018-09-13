
一，安装brew

首先按该步骤进行安装，但发现第4步是走不通的，之后查到解决方案：
先卸载已安装的homebrew，命令如下
> /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"

再重新安装：`只要在终端执行此命令即可完成安装`
> /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"


大功告成

> 该补充方法来自https://blog.csdn.net/yemao_guyue/article/details/80575532


> 以下内容来自https://blog.csdn.net/fxp850899969/article/details/53284193

1，安装brew

curl -LsSf http://github.com/mxcl/homebrew/tarball/master | sudo tar xvz -C/usr/local --strip 1


2，安装完成后执行

brew

提示：Please run brew update!



3，按照提示更新，执行


brew update

报错：Error: /usr/local must be writable!



4，赋给/usr/local目录权限，执行sudo chown -R $(whoami) /usr/local，即


sudo chown -R fxp /usr/local

其中fxp为系统当前用户名。



5，再次执行

brew update




6，按照提示删除/usr/local/share/doc/homebrew，执行


rm -r -f /usr/local/share/doc/homebrew


7，再次执行

brew update


安装更新成功！

navicat 
https://www.52pojie.cn/thread-727433-1-1.html

