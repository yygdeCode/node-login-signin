let dbutil = require('./dbutil')

function queryAllStudent(success) {
    let querySql =  "select * from student;";
    let connection =  dbutil()
    connection.connect()
    connection.query(querySql,function(error,result){
        if(error == null){
            success(result)
        }else{
            success(error)
        }
    })
    connection.end()
}



function addStudent(data,success) {
    let stuNum = data.toString().split('&')[0].split('=')[1],
        password = data.toString().split('&')[1].split('=')[1],
        age = data.toString().split('&')[2].split('=')[1],
        name = data.toString().split('&')[3].split('=')[1],
        cla = data.toString().split('&')[4].split('=')[1]
    let connection =  dbutil()
    connection.connect();
    let querySql = 'insert into student(`stu_num`,`name`,`age`,`class`,`pwd`) values(?,?,?,?,?);';
    connection.query(querySql,[stuNum,name,age,cla,password],function (error,result) {
        if(error == null){
            success(result)
        }else{
            success(error)
        }
    })
    connection.end()
}

function queryStudentByStuNum(stuNum,success){
    let querySql = 'select * from student where stu_num = ?;';
    let connection =  dbutil()
    connection.connect();
    connection.query(querySql,stuNum,function (error,result) {
        if(error == null){
            success(result)
        }else{
            success(error)
        }
    })
    connection.end()
}

module.exports = {
    'queryAllStudent' : queryAllStudent,
    'queryStudentByStuNum' : queryStudentByStuNum,
    'addStudent': addStudent
}

