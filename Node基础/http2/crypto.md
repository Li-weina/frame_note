## 两种加密方法
> 摘要算法，同样内容加密出来，永远一样，不同内容，加密出来永远不一样
```javaScript
//hamc
let crypto = require('crypto')
let hmac = crypto.createHmac('sha256','zfpx1')
let res = hmac.update('zf').update('px').digest('base64')
console.log(res)

//hash 通过密钥，才能摘要出相同内容，更加安全  cookie
let r = crypto.createHash('md5').update('zfpx').digest('base64')
console.log(r)
r = crypto.createHash('md5').update('zf').update('px').digest('base64')
console.log(r)
```