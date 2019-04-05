let studentDao = require('../dao/studentDao');

function queryAllStudent(success){
    studentDao.queryAllStudent(success)
}
function queryStudentByStuNum(stuNum,success){
    studentDao.queryStudentByStuNum(stuNum,success)
}
function addStudent(data,success){
    studentDao.addStudent(data,success)
}
module.exports = {
    'queryAllStudent' : queryAllStudent,
    'queryStudentByStuNum': queryStudentByStuNum,
    'addStudent': addStudent
}