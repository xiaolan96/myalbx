// 这个文件来实现分类数据的用户请求的响应

var cateModule = require("../modules/cateModule");

exports.getAllcateList = (req, res) => {
  cateModule.getAllCateList((err, data) => {
    if (err) {
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
