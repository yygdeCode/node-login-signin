let http = require('http')
let url = require('url')
let fs = require('fs')
let loader = require('./loader')
let globalConfig = require('./config')
let filterSet = require('./filterLoader')
let log = require('./log')

http.createServer(function (request,response) {

    let pathName = url.parse(request.url).pathname;
    log(pathName)   //日志，记录请求

    for(let i = 0;i < filterSet.length ;i ++){
        let flag = filterSet[0](request,response)
        if(!flag){
            return;
        }
    }

    let isStatic = isStaticsRequest(pathName)
    if(isStatic){      //静态文件
        try{
            let data = fs.readFileSync(__dirname + '/' + globalConfig['page_path'] + pathName)
            response.writeHead(200)
            response.write(data)
            response.end()
        }catch (e) {
            response.writeHead(404)
            response.write('<html><body>404</body></html>')
            response.end()
        }
    }else{    //动态数据
        if(loader.get(pathName) != null){
            try {
                loader.get(pathName)(request, response)
            }catch (e) {
                response.writeHead(500)
                response.write('<html><body>500</body></html>')
                response.end()
            }
        }else{
            response.writeHead(404)
            response.write('<html><body>404</body></html>')
            response.end()
        }
    }
}).listen(12306)

log('服务已经启动')

function isStaticsRequest(pathName) {
    for(let i = 0;i < globalConfig.static_file_type.length; i++){
        let temp = globalConfig.static_file_type[i]
       if(pathName.indexOf(temp) == pathName.length - temp.length ){
           return true
       }
    }
    return false
}