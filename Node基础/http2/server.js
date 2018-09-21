let http = require('http');
let url = require('url');
let fs = require('fs')
let util = require('util');
let path = require('path')
let stat = util.promisify(fs.stat)
let server = http.createServer(async (req,res)=>{
    let {pathname} = url.parse(req.url,true)
    let realPath = path.join(__dirname,'public',pathname)
    let staObj = await stat(realPath)
    if(staObj.isDirectory()){
        fs.createReadStream(path.join(realPath,'index.html')).pipe(res)
    }else{
        fs.createReadStream(realPath).pipe(res)
    }
})
server.listen(3001)