https://www.jianshu.com/p/4cb5ef29a099

## 启动服务
brew install mysql
启动
mysql.server start
配置命令
$ mysql_secure_installation
`Disallow root login remotely 一项为no`
在用navicat登陆时，不能连接，报错为
2059 - Authentication plugin 'caching_sha2_password' cannot be loaded: dlope

解决方案
在终端登录mysql
mysql -u root -p

输入
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Aa123456.'
`密码要和配置中选择的密码强度一致`

> 需要注意mysql安装方式不同，启动方式不同，并且更改初始密码的方式也不同，如果官网下载的，其更改方式可参考 https://www.cnblogs.com/pengzhaov/p/7266947.html



