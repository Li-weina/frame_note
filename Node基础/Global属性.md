## Global属性
1. console系列
 * console.log()
 * console.info()
 > 等同于 process.stdout.write()
 * console.error()
 * console.warn()
 > 等同于process.stderr.write()
 * console.assert()
 * console.time()
 * console.timeEnd()
 > 还有 process.on('data',function(data){console.log(data)})

 2. process系列
 * process.platform
 * process.pid
 * process.agv
 * process.env
 * process.kill
 * process.exit
 * process.cwd()
 * process.nextTick()

 3. 定时器系列
 * setImmediate()
 * clearSetImmediate()
 * setTimeout()
 * clearSetTimeout
 * setInterval
 * clearSetInterval

 4. Buffer系列

