$(function () {

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
  function render(proName) {
    var params = {
      proName: proName || $('.search-input').val(),
      page: 1,
      pageSize: 100
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
      dataType: '',
      success: function (info) {
        console.log(info);

        $('.lt_items ul').html(template('searchItems', info))
      }
    })
  }
  render()




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