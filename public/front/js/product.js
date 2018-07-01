$(function () {

  function render() {
    console.log(getSearchObj('productId'));

    $.ajax({
      type: 'get',
      url: '/product/queryProductDetail',
      data: {
        id: getSearchObj('productId')
      },
      dataType: 'json',
      success: function (info) {
        var size = info.size
        var arr = size.split('-')
        var start = +arr[0]
        var end = +arr[arr.length - 1]

        var sizeArr = []
        for (var i = start; i <= end; i++) {
          sizeArr.push(i)
        }

        info.size = sizeArr

        $('.lt_body .mui-scroll').html(template('productList', info))
        // 初始化商品数量输入框
        mui(".mui-numbox").numbox()
      }
    })
  }
  render()


  //用户选择尺码
  $('.lt_body').on('tap', '.lt_proSize a', function () {
    $(this).addClass('current').parent().siblings().find('a').removeClass('current')
  })



  $('.lt_body').on('tap', '.joinCar', function () {
    var num = $('.lt_proNum input').val(),
      size = $('.lt_proSize a.current').text()

    if (!size) {
      mui.toast('调皮! o(*￣︶￣*)o')
      return
    }

    $.ajax({
      type: 'post',
      url: '/cart/addCart',
      data: {
        productId: getSearchObj('productId'),
        num: num,
        size: size
      },
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        info.error === 400 && mui.toast('未登录')
      }
    })
  })

})