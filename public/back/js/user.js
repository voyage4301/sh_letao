//动态渲染用户数据
var currentPage = 1

//动态渲染数据
function render(currentPage, pageSize) {
  $.ajax({
    type: 'GET',
    url: '/user/queryUser',
    data: {
      page: currentPage || 1,
      pageSize: pageSize || 10
    },
    dataType: 'json',
    success: function (info) {
      $('.lt_content tbody').html(template('tmp', {
        list: info.rows
      }))
    }
  })
}

render()
setPage()

//分页
function setPage() {
  $.ajax({
    type: 'GET',
    url: '/user/queryUser',
    data: {
      page: 1,
      pageSize: 10
    },
    dataType: 'json',
    success: function (info) {
      var totalPage = Math.ceil((info.total / info.size))
      $('#paginator').bootstrapPaginator({
        bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
        currentPage: 1, //当前页
        totalPages: totalPage, //总页数
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

//禁用功能(复用模态框)
var id = 0
var isDelete = 0
$('tbody').on('click', '.btn-danger', function () {
  $('#myModal1').modal('show')
  id = $(this).parent().data('id')
  isDelete = $(this).parent().data('isdelete')
  isDelete === 1 && (isDelete = 0);
})
//启用功能
$('tbody').on('click', '.btn-success', function () {
  $('#myModal1').modal('show')
  id = $(this).parent().data('id')
  isDelete = $(this).parent().data('isdelete')
  isDelete === 0 && (isDelete = 1);
})
//
$('#myModal1 .btn-primary').on('click', function () {
  $.ajax({
    type: 'post',
    url: '/user/updateUser',
    data: {
      id: id,
      isDelete: isDelete
    },
    dataType: 'json',
    success: function (info) {
      $('#myModal1').modal('hide')
      render(currentPage)
    }
  })
})