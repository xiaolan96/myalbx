// 引入user表的控制器
const pagesController = require("../controllers/pagesController.js");
// 引入express模块
const express = require("express");
// 引入路由
// Router()构造函数创建的路由对象可以当成一个中间件来使用
const router = express.Router();

// 当监听到Get方式的/请求的时候，会调用函数进行处理，并且为传递两个参数：req,res
// 这两个参数是服务器传递的，不是你一开始就有的

// 前台页面
router
  .get("/", pagesController.getIndexPage)
  .get("/list", pagesController.getListPage)
  .get("/detail", pagesController.getDetailPage)

  // 后台管理页面，统一添加admin作为前缀

  .get("/admin", pagesController.getAdminPage);
module.exports = router;
