var mysql = require('mysql');

var connMySQL = function(){
	return mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'eduardo',
		database : 'gerenciamento_jobs'
	});
}

module.exports = function () {
	return connMySQL;
}