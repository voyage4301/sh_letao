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
    //显示模态框
    $('#myModal1').modal('show')
    //获取一级分类的数据
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        //动态生成下拉选项
        $('.select-menu').html(template('first-tmp', info))
        //下拉选项点击事件
        $('.select-menu li a').each(function () {
          $(this).on('click', function () {
            $('#categoryId').val($(this).data('id'))
            $('#form').data('bootstrapValidator').updateStatus('categoryId', 'VALID')
            $('.dropdownText').text($(this).text())
          })
        })
      }
    })
  })

  //图片上传回显
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      $('.img-box img').attr('src', data.result.picAddr)
      $('[name="brandLogo"]').val(data.result.picAddr)
      $('#form').data('bootstrapValidator').updateStatus('brandLogo', 'VALID')
    }
  })

  //表单验证
  $('#form').bootstrapValidator({
    //1.指定不校验的类型
    excluded: [],
    //2.设置校验的字体图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', //校验成功
      invalid: 'glyphicon glyphicon-remove', //校验失败
      validating: 'glyphicon glyphicon-refresh' //校验中
    },
    //3.设置规则
    fields: {
      categoryId: {
        validators: {
          notEmpty: {
            message: '请您选择一级分类!'
          }
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: '请您输入二级分类名!'
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请您上传图片!'
          }
        }
      }
    }
  })

  //添加二级分类
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/category/addSecondCategory',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          $('#myModal1').modal('hide')
          $('#form').data('bootstrapValidator').resetForm(true)
          currentPage = 1
          render(currentPage)

          $('.dropdownText').text('请选择一级分类')
          $('.img-box img').attr('src', './images/default.png')
        }
      }
    })
  })

})