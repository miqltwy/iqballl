let mysql = require('mysql');
let connnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_framework',
});
connnection.connect(function(error){
    if(!!error){
        console.log(error)
    }else{
        console.log('Connection Success')
    }
})

module.exports = connnection;