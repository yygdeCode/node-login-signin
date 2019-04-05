let fs = require('fs')
let globalConfig = require('./config')
let filterSet = []

let files = fs.readdirSync(__dirname + globalConfig['filter_path'])


for(let i = 0;i < files.length;i++){
    let temp = require('./' + globalConfig['filter_path']+'/' + files[i])
    filterSet.push(temp);
}



module.exports = filterSet