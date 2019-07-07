// 所有与分类表相关的操作都在这个文件中完成
const connection = require("./commModule");

// 获取所有分类数据
exports.getAllCateList = callback => {
  var sql = "select * from categories";
  connection.query(sql, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};
