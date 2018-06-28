$(function () {

  // 1.区域滚动
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });

  //2.动态渲染左侧信息
  function renderLeft() {
    $.ajax({
      type: 'get',
      url: '/category/queryTopCategory',
      dataType: 'json',
      success: function (info) {
        // console.log(info);
        $('#firstList').html(template('listFirst', info))
        $('#firstList').children().eq(0).addClass('current')
      }
    })
  }
  renderLeft()

  //3.动态渲染右侧二级信息
  function renderRight(id) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategory',
      data: {
        id: id || 1
      },
      dataType: 'json',
      success: function (info) {
        $('#secondList').html(template('listSecond', info))
      }
    })
  }
  renderRight()

  //4.一级目录点击渲染二级
  $('#firstList').on('click', 'a', function () {
    $(this).parent().siblings().each(function () {
      $(this).removeClass('current')
    })
    $(this).parent().addClass('current')
    renderRight($(this).data('id'))
  })

})