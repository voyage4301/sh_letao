$(function () {

  function render() {
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
        var gallery = mui('.mui-slider');
        gallery.slider({
          interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
        });
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

  //登出
  // $.ajax({
  //   type: 'get',
  //   url: '/user/logout',
  //   dataType: 'json',
  //   success: function (info) {
  //     console.log(info);
  //   }
  // })

  $('.lt_body').on('tap', '.joinCar', function () {
    var num = $('.lt_proNum input').val(),
      size = $('.lt_proSize a.current').text()

    if (!size) {
      mui.toast('调皮! o(*￣︶￣*)o')
      return
    }
    var productId = getSearchObj('productId')
    $.ajax({
      type: 'post',
      url: '/cart/addCart',
      data: {
        productId: productId,
        num: num,
        size: size
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.error === 400) {
          location.href = './login.html?retUrl=' + location.href
        } else {
          mui.confirm("添加成功", "温馨提示", ["去购物车", "继续浏览"], function (e) {
            if (e.index == 0) {
              // location.href = "cart.html";
            }
          });
        }
      }
    })
  })

})