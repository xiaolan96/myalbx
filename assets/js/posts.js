$(function() {
  // 当前页码
  var pagenum = 1;
  // 每页显示的记录数
  var pagesize = 2;

  // 发起ajax请求，请求所有文章数据
  init({});

  // 实现用户数据的筛选
  $(".btn-search").on("click", function() {
    // 重点获取用户数据，你也可以使用全局变量
    var query = {};
    // 判断用户有没有选择指定的筛选条件
    if ($(".cateSelector").val() != "all") {
      query.cate = $(".cateSelector").val();
    }
    if ($(".statuSelector").val() != "all") {
      query.statu = $(".statuSelector").val();
    }
    // 发起请求
    init(query);
    // console.log(query.cate, query.statu);
  });

  // 使用一个自调用函数来实现分类数据的加载
  (function() {
    $.ajax({
      type: "get",
      url: "/getAllCateList",
      success: function(res) {
        // 生成分类数据的动态结构

        var html = '<option value="all">所有分类</option>';
        for (var i = 0; i < res.data.length; i++) {
          html += `<option value="${res.data[i].id}">${
            res.data[i].name
          }</option>`;
        }
        $(".cateSelector").html(html);
      }
    });
  })();

  // 数据初始化
  function init(query) {
    $.ajax({
      type: "get",
      url: "/getPostList",
      data: {
        pagenum: pagenum,
        pagesize: pagesize,
        ...query
      },
      dataType: "json",
      success: function(res) {
        // 生成文章数据结构
        var html = template("postListTemp", res.data);
        $("tbody").html(html);
        // 生成分页结构
        setPage(Math.ceil(res.data.total / pagesize));
        console.log(res);
      }
    });
  }

  // 实现分页
  function setPage(count) {
    $(".pagination").bootstrapPaginator({
      // 设置版本号
      bootstrapMajorVersion: 3,
      // 设置当前页
      currentPage: pagenum,
      // 总页数：当前数据表的记录总数 / 每页所显示的记录数
      totalPages: count,
      // 当单击页码按钮的时候，执行该函数，调用ajax渲染页面
      onPageClicked: function(event, originalEvent, type, page) {
        // 我们发现，这个page就是当前的合理页码值，我们只需要将全局的pagenem重置，并且重新获取数据可以了
        pagenum = page;
        // 重新获取数据
        init();
      }
    });
  }

  // 使用时间委托的方式来实现文章数据的删除
  $("tbody").on("click", ".btndel", function() {
    // 添加删除确认对话框
    // confirm返回一个bool值，如果你被单击了确定，就是true,否则就是false
    if (window.confirm("你是否真的需要删除？")) {
      // 获取id
      var id = $(this).data("id");
      $.ajax({
        type: "get",
        url: "/delPostById",
        data: { id: id },
        success: res => {
          console.log(res);
        }
      });
    }
  });
});
