const connection = require("./commModule");

// 获取所有文章数据
/******
 * params :它是一个对象，里面有三个属性
 * pagenum:页码
 *  pagesize:每页记录数
 * query:用户搜索条件
 */
exports.getPostList = (params, callback) => {
  var sql = `select posts.id pid,posts.slug,posts.title,posts.feature,posts.created,posts.content,posts.status,users.id uid,users.nickname,categories.name
  from posts
  inner join users on posts.user_id = users.id
  inner join categories on posts.category_id = categories.id
  where 1=1  `;
  // 这里可以根据判断结构拼接筛选条件
  if (params.cate) {
    // 拼接分类条件
    sql += ` and posts.category_id = ${params.cate} `;
  }
  if (params.statu) {
    sql += ` and posts.status = '${params.statu}' `;
  }
  sql += ` order by posts.id desc limit ${(params.pagenum - 1) *
    params.pagesize},${params.pagesize} `;
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log(results);
      sql = "select count(*) cnt from posts";
      // callback(null, results);
      connection.query(sql, (err1, data1) => {
        if (err1) {
          callback(err1);
        } else {
          // 我们又需要返回查询出的数据，又需要返回查询出总记录数
          callback(null, { result: results, total: data1[0].cnt });
        }
      });
    }
  });
};

//根据文章id删除文章数据
exports.delPostById = (id, callback) => {
  var sql = "delete from posts where id = " + id;
  connection.query(sql, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  });
};
