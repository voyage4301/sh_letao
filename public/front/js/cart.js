$(function () {

  // 1.渲染
  function render() {
    $.ajax({
      type: 'get',
      url: '/cart/queryCart',
      dataType: 'json',
      success: function (info) {
        console.log(info);

        $('.lt_body .mui-table-view').html(template('productList', {
          rows: info
        }))
        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh()
        // location.href = './login.html'
      }
    })
  }
  //2.下拉
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper",
      down: {
        auto: true,
        callback: function () {
          render()
        }
      }

    }
  })

  //3.删除
  $('.mui-table-view').on('tap', '.mui-btn-danger', function () {
    var id = $(this).data('id')
    $.ajax({
      type: 'get',
      url: '/cart/deleteCart',
      data: {
        id: [id]
      },
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading()
        }
      }
    })
  })

  //4.编辑
  $('.mui-table-view').on('tap', '.mui-btn-primary', function () {
    var data = this.dataset,
      id = data.id
    mui.confirm(template('editItem', data).replace(/\n/g, ''), '编辑商品', ['确认', '取消'], function (e) {
      if (e.index === 0) {
        var size = $('.lt_size a.current').text(),
          num = $('.mui-numbox-input').val()
        $.ajax({
          type: 'post',
          url: '/cart/updateCart',
          data: {
            id: id,
            size: size,
            num: num
          },
          success: function (info) {
            if (info.success) {
              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading()
            }
          }
        })

      }
    })
    mui('.lt_num .mui-numbox').numbox()
  })

  //4.1编辑框选尺码
  $('body').on('tap', '.lt_size a', function () {
    console.log(11);
    $(this).addClass('current').parent().siblings().find('a').removeClass('current')
  })

  //计价
  $('body').on('click', '.ck', function () {
    var $all = $('.lt_body .ck:checked')
    var totalPrice = 0
    $all.each(function (i, v) {
      totalPrice += $(this).data('price') * $(this).data('num')
    })
    $('#totalPrice').text(totalPrice.toFixed(2))
  })
})