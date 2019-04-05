let studentService = require('../service/studentService')
let path = new Map()
function getData(requset,response){
    studentService.queryAllStudent(function (result) {
        let resArr = [];
        for(let i = 0;i < result.length;i ++){
            resArr.push(result[i].name)
        }
        response.writeHead(200)
        response.write(resArr.toString())
        response.end()
    })
}
// function login(requset,response){
//     let params = url.parse(requset.url,true).query;
//     studentService.queryStudentByStuNum(params.stuNum,function (result) {
//         let res = ''
//         if(result == null || result.length == 0){
//             res = 'Fail'
//         }else{
//             if(result[0].pwd == params.password ){
//                 res = 'OK'
//             }else{
//                 res = 'Fail'
//             }
//         }
//         response.write(res)
//         response.end()
//     })
// }
function login(request,response){
    request.on('data',function (data) {
        let stuNum = data.toString().split('&')[0].split('=')[1],
            password = data.toString().split('&')[1].split('=')[1];
        studentService.queryStudentByStuNum(stuNum,function (result) {
            let res = '';
            if(result == null || result.length == 0){
                res = 'Fail'
            }else{
                if(result[0].pwd == password ){
                    res = 'OK'
                }else{
                    res = 'Fail'
                }
            }
            response.writeHead(200,{'Set-Cookie':'id='+ result[0].id});
            response.write(res)
            response.end()
        })
    })
}

function sign(request,response){
    request.on('data',function (data) {
        studentService.addStudent(data,function (result) {
            console.log(result)
            response.writeHead(200);
            response.write('sign ok');
            response.end()
        })
    })
}
function hasUser(request,response){
    request.on('data',function (data) {
        let stuNum = data.toString().split('&')[0].split('=')[1]
        studentService.queryStudentByStuNum(stuNum, function (result) {
            let res = '';
            if(result == null || result.length == 0 || result.toString()[0] == 'E'){
                res = 'Fail'
            }else{
               res = "OK"
            }
            response.writeHead(200);
            response.write(res)
            response.end()
        })
    })
}

path.set('/hasUser',hasUser)
path.set('/sign',sign)
path.set('/getData',getData)
path.set('/login',login)
module.exports.path = path