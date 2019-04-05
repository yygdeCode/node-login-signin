let fs = require('fs')
let globalConfig = require('./config')
let fileName = globalConfig['log_path'] + '/' +globalConfig['log_name']

function log(data) {
    let logData =  new Date() + ' - ' + data;
    console.log('log:' + logData)
    fs.writeFile(__dirname + fileName, logData + '\n' , {flag : 'a'},function () {})
}
module.exports = log