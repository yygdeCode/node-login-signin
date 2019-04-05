let url = require('url')
let globalConfig = require('../config')
let pathArr = ['/login.html','/sign.html','/hasUser','/sign','/login']

function loginFilter(request,response) {

    let pathName = url.parse(request.url).pathname
    if( pathArr.includes(pathName) || isStaticsRequest(pathName)){
        return true;
    }
    if(request.headers.cookie){
        let cookies = request.headers.cookie.split(';');
        for(let i = 0;i < cookies.length;i++){
            if(cookies[i].split('=')[0].trim() == 'id'){
                return true;
            }
        }
    }
    response.writeHead(302,{'location': "/login.html"})
    response.end()
    return false
}


function isStaticsRequest(pathName) {
    for(let i = 0;i < globalConfig.static_file_type.length; i++){
        let temp = globalConfig.static_file_type[i]
        if(temp == '.html'){
            continue;
        }
        if(pathName.indexOf(temp) == pathName.length - temp.length ){
            return true
        }
    }
    return false
}
module.exports = loginFilter