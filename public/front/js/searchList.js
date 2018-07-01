$(function () {
  var current = 1,
    pageSzie = 2
  // 导航变色
  $(".nav a[data-type]").each(function () {
    $(this).on('click', function () {
      if ($(this).hasClass('current')) {
        $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
      }
      $(this).addClass('current')
      $(this).siblings().removeClass('current')
      render()
    })
  })


  $('.search-input').val(getSearchObj('key'))
  //进入时渲染搜索的商品数据
  function render(callback) {
    var params = {
      proName: $('.search-input').val(),
      page: current,
      pageSize: pageSzie
    }
    var $current = $('.nav .current')
    if ($current.length > 0) {
      var sortName = $current.data('type')
      sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1
      params[sortName] = sortValue;
    }
    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: params,
      dataType: 'json',
      success: function (info) {
        callback && callback(info)
        console.log(info);
      }
    })
  }
  // render()

  //配置下拉刷新
  mui.init({
    pullRefresh: {
      container: ".mui-scroll-wrapper", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        auto: true,
        callback: function () {
          current = 1
          render(function (info) {
            $('.lt_items ul').html(template('searchItems', info))
            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh()
            mui('.mui-scroll-wrapper').pullRefresh().enablePullupToRefresh()
          })
        }
      },
      up: {
        callback: function () {
          current++
          render(function (info) {
            if (info.data.length === 0) {
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true)
            } else {
              $('.lt_items ul').append(template('searchItems', info))
              mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh()
            }
          })
          // 请求下一页的数据,追加到原有页面中
        }
      }
    }
  });


  function getHistory(key) {
    var history = localStorage.getItem(key) || '[]'
    var arr = JSON.parse(history)
    return arr
  }
  //点击搜索按钮渲染商品
  $('.search-btn').on('click', function () {
    var proName = $('.search-input').val()
    if (proName === '') {
      mui.toast('调皮! o(*￣︶￣*)o')
      return
    }
    var arr = getHistory('value'),
      index = arr.indexOf(proName)

    index !== -1 && arr.splice(index, 1) //删除相同的项目
    arr.unshift(proName) //

    arr.length > 10 && arr.pop() //限制条数

    localStorage.setItem('value', JSON.stringify(arr)) //新增
    render()
    $('.search-input').val('') //重置搜索框
  })

})