

//这个文件是否存在，不存在会报错，存在正常，此方法同fs.accessSync 、fs.existsSync
fs.statSync('20.txt')

//是否是文件夹
let statObj = fs.statSync('public')
statObj.isDirectory()

// 判断一个文件的大小
fs.statSync('1.txt').size