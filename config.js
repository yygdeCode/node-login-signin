let fs = require('fs')
let conf = fs.readFileSync(__dirname + '/server.conf')
let configArr = conf.toString().split('\n')
let globalConfig = {}
for(let i = 0;i < configArr.length; i++){
    globalConfig[configArr[i].split('=')[0]] = configArr[i].split('=')[1]
 }
if(globalConfig.static_file_type){
    globalConfig.static_file_type = globalConfig.static_file_type.split('|')
}else{
    throw new Error('配置文件异常，缺少static_file_type')
}


module.exports = globalConfig