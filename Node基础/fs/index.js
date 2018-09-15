
fs.readFile(path.resolve(__dirname,'note.md'),{encoding:'utf8',flag:'r'},function(err,data){
    console.log(data)
})

let f = fs.readFileSync(path.resolve(__dirname,'note.md'),{encoding:'utf8',flag:'r'})

console.log(f)

fs.writeFileSync(path.resolve(__dirname,'1.txt'),'hello world',{flag:'w'})


fs.writeFile(path.resolve(__dirname,'2.txt'),'nono',{flag:'a'},function(err){
    console.log(err)
},)

fs.appendFile(path.resolve(__dirname,'2.txt'),'okkok',function(err){
    console.log(err)
})

//fs.open  fs.read fs.write fs.close
let fs = require('fs')
let path = require('path')
fs.open(path.resolve(__dirname,'2.txt'),'r',function(err,fd){
    let buffer = Buffer.alloc(8)
    fs.read(fd,buffer,0,5,2,function(err,bytesRead){
        console.log(bytesRead)
        console.log(buffer.toString())
    })
})

// let fs = require('fs')
// // fs.mkdir('a/',()=>{})

// function makep(filePath) {
//     let ary = filePath.split('/')
//     for(let i=0;i<ary.length;i++){
//         let dir = ary.slice(0,i+1).join('/');// 这一步的写法
//          console.log(dir)
//          try{
//             fs.accessSync(dir)
//          }catch(e){
//             fs.mkdirSync(dir)
//          }
//     }
// }
// makep('a/b/c')

let fs = require('fs')
function makep(p,cb){
    let ary = p.split('/');
    let index = 0;
    function next(){
        if(index === ary.length) return cb()//这一步的写法
        let dir = ary.slice(0,++index).join('/');
        console.log(index)
        fs.access(dir,function(err){
            if(err){
                fs.mkdir(dir,function(err){
                    next()
                })
            }else{
                next()
            }
        })
    }
    next()


}
makep('a/b/c',function(){
    console.log('ok')
})


let fs = require('fs')
async function makep(){

}

makep('a/b/c',()=>{
    console.log('ok')
})

function promisfy(fn){
    return function(...args){
        return new Promise((resolve,reject)=>{
            fn(...args,function(err){
                if(err) reject(err);
                resolve()
            })
        })
    }
}
let fs = require('fs')
let mkdir = promisfy(fs.mkdir)
let access = promisfy(fs.access)
async function makep(p){
    let ary = p.split('/');
    for(let i=0;i<ary.length;i++){
        let realPath = ary.slice(0,i+1).join('/')
        try{
            await access(realPath)
        }catch(e){
            await mkdir(realPath)
        }

    }

}

makep('e/f/g').then((data)=>{
    console.log('ok')
})

