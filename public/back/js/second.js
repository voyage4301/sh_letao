$(function () {

  //渲染分类数据
  var currentPage = 1;

  function render(currentPage, pageSize) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: currentPage || 1,
        pageSize: pageSize || 2
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        var total = Math.ceil(info.total / info.size)
        $('.lt_content tbody').html(template('tmp', info))
        $('.lt_content #pagintor').bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: currentPage, //当前页
          totalPages: total, //总页数
          size: "small", //设置控件的大小，mini, small, normal,large
          onPageClicked: function (a, a, a, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            render(page)
            currentPage = page
          }
        })
      }
    })
  }
  render()

  //点击显示模态框
  $('.lt_content .btn').on('click', function () {
    $('#myModal1').modal('show')
  })

  //添加图片
  $('#myModal1 .btn-addImg').on('click', function () {
    console.log('哈哈');
    $("[type='file']").click()

  })
})