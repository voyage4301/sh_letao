$(function () {

  var current = 1, //当前页码
    pageSize = 4, //列表条数
    status = 0, //商品状态
    id = 0 //商品id
  //1.渲染数据
  function render() {
    $.ajax({
      type: 'get',
      url: '/product/queryProductDetailList',
      data: {
        page: current,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        //渲染商品信息
        var total = Math.ceil(info.total / info.size)
        $('#itemsInfo tbody').html(template('itemsList', info))

        //分页
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: current,
          totalPages: total,
          size: 'small',
          useBootstrapTooltip: true, //是否使用bootstraptoltip的组件
          itemTexts: function (type, page, current) { //自定义分页按钮文本
            switch (type) {
              case 'page':
                return page
              case 'first':
                return "首页"
              case 'prev':
                return "上一页"
              case 'next':
                return "下一页"
              case 'last':
                return '尾页'
            }
          },
          tooltipTitles: function (type, page, current) { //配置分页按钮提示信息
            switch (type) {
              case 'page':
                return '前往' + page + '页'
              case 'first':
                return "前往首页"
              case 'prev':
                return "上一页"
              case 'next':
                return "下一页"
              case 'last':
                return '前往尾页'
            }
          },
          onPageClicked: function (a, a, a, page) {
            current = page
            render()
          }
        })
      }
    })
  }

  render()

  //2.1切换商品状态 <切换!!!接口开发中>

  $('#itemsInfo').on('click', '.btn', function () {
    // $('#statusModal').modal('show')
    id = $(this).parent().data('id')
    status = $(this).parent().data('status') === 1 ? 0 : 1
  })
  //2.2 切换
  $('#status_btn').on('click', function () {
    // $.ajax({

    // })
  })

  //3.添加分类
  $('#addItems_btn').on('click', function () {
    $('#addItemsModal').modal('show')

    // 3.1动态生成下拉框
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: 1,
        pageSize: 100
      },
      dataType: 'json',
      success: function (info) {
        //动态渲染
        $('.dropdown-menu').html(template('secondList', info))

        //下拉框选项点击事件
        $('.dropdown-menu li a').each(function () {
          $(this).on('click', function () {
            $('.dropdown_name').text($(this).text()) //更改下拉框title
            $('#brandId').val($(this).data('id')) //存储隐藏域二级分类id
            $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID')
          })
        })
      }
    })
  })

  //4.图片上传
  //上传三张图片,一次响应一张
  var picarr = []
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function (e, data) {
      var obj = { //一个对象对应一张图片的名称和地址
        picName: data.result.picName,
        picAddr: data.result.picAddr
      }

      $('#upimg').append('<img class="upImg" src=' + obj.picAddr + ' height="50" alt="">') //回显图片
      picarr.push(obj) //存储一张图片的信息

      if (picarr.length > 3) { //限制3张图片
        $('#upimg').find('img:nth-of-type(-n+' + (picarr.length - 3) + ')').remove()
        picarr.shift()
      }

      if (picarr.length === 3) {
        $('#form').data('bootstrapValidator').updateStatus('picup', 'VALID')
      }

      picarr.forEach(function (v, i) { //存储图片的信息
        $('.picName').eq(i).val(v.picName)
        $('.picAddr').eq(i).val(v.picAddr)
      })
    }
  })

  //5.表单验证
  $('#form').bootstrapValidator({
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类!'
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称!'
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述!'
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品数量'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '商品库存必须是非零开头的数字'
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺寸'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '商品尺码必须是 xx-xx 的格式, 例如 32-40'
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品现价!'
          }
        }
      },
      picup: {
        validators: {
          notEmpty: {
            message: '请上传3张商品图片!'
          }
        }
      }
    }
  })

  //6.模态框确认添加
  $('#form').on('success.form.bv', function (e) {
    e.preventDefault()
    $.ajax({
      type: 'post',
      url: '/product/addProduct',
      data: $('#form').serialize(),
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          $('#addItemsModal').modal('hide')
          render()
          $('#form').data('bootstrapValidator').resetForm(true)
          $('.dropdown_name').text('请选择二级分类')
          $('#upimg img').remove()
        }
      }
    })
  })

})