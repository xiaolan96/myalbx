var postsModule = require("../modules/postsModule");
var moment = require("moment");
exports.getPostList = (req, res) => {
  // 获取参数
  var obj = req.query;
  // 获取所有文章列表并返回
  // 数据获取调用数据模块进行处理
  postsModule.getPostList(obj, (err, data) => {
    if (err) {
      console.log(err);
      res.json({
        code: 400,
        msg: "数据查询失败"
      });
    } else {
      res.json({
        code: 200,
        msg: "数据查询成功",
        data: data
      });
    }
  });
};
// 根据文章id删除文章数据
exports.delPostById = (req, res) => {
  var id = req.query.id;
  // 调用数据模块中的方法
  postsModule.delPostById(id, err => {
    if (err) {
      res.json({
        code: 400,
        msg: "数据删除失败"
      });
    } else {
      res.json({
        code: 200,
        msg: "数据删成功"
      });
    }
  });
};

// 实现文章的新增
exports.addPost = (req, res) => {
  // 接收参数
  var obj = req.body;
  obj.views = 0;
  obj.likes = 0;
  obj.user_id = req.session.currentUser.id;
  console.log("0000000000000");
  console.log(req.session.currentUser);
};
