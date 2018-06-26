$(function () {

  var currentPage = 1

  //渲染数据
  function render(currentPage, pageSize) {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: currentPage || 1,
        pageSize: pageSize || 2
      },
      dataType: 'json',
      success: function (info) {
        var total = Math.ceil(info.total / info.size)
        $('.it_content tbody').html((template('tmp', info)))

        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: currentPage, //当前页
          totalPages: total, //总页数
          size: "small", //设置控件的大小，mini, small, normal,large
          onPageClicked: function (a, a, a, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            render(page)
            currentPage = page
          }
        });
      }
    })
  }
  render()

  //打开模态框
  $('.it_content .btn').on('click', function () {
    $('#myModal1').modal('show')
  })

  //表单验证
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', //校验成功
      invalid: 'glyphicon glyphicon-remove', //校验失败
      validating: 'glyphicon glyphicon-refresh' //较严重
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: '分类名不能为空!'
          },
          stringLength: {
            min: 2,
            max: 6,
            message: '分类名长度为2-6位!'
          }
        }
      }
    }
  })

  //添加按钮的点击事件
  $('.modal-footer .btn-primary').on('click', function (e) {
    //表单验证
    e.preventDefault()
    $('#myModal1').modal('hide')
    var name = $('.modal-body input').val()
    $.ajax({
      type: 'POST',
      url: '/category/addTopCategory',
      data: {categoryName: name},
      dataType: 'json',
      success: function (info) {
        console.log(info);
        render(currentPage)
      }
    })

  })
})