
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

