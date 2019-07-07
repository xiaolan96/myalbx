// 1.引入mysql
var mysql = require("mysql");
// 2.创建链接
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "baixiu",
  dateStrings: true
});
// 3.打开链接--不用写，他会默认找到最近所创建的连接来使用

module.exports = connection;
