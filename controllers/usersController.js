var userModule = require("../modules/userModule");
exports.login = (req, res) => {
  var obj = req.body;
  // 登录验证应该由数据库中的数据来决定
  userModule.login(obj.email, (err, data) => {
    if (err) {
      res.json({
        code: 400,
        msg: "服务器异常"
      });
    } else {
      if (data) {
        //没有能够查询到结果
        if (data.password == obj.password) {
          // 以session方式来实现状态保持：这里写入session数据
          req.session.isLogin = "true";
          // 将当前用户对象存储到session
          req.session.currentUser = data;
          // 将当前成功登陆的用户信息进行存储，以便我后期需要的时候进行获取
          res.end(
            JSON.stringify({
              code: 200,
              msg: "登录成功"
            })
          );
        } else {
          res.json({
            code: 400,
            msg: "密码错误"
          });
        }
      } else {
        res.json({
          code: 400,
          msg: "邮箱输入错误"
        });
      }
    }
  });
};
