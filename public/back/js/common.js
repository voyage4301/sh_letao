// ajax全局事件
// .ajaxComplete() //每个ajax完成时调用,无论成功与否
// .ajaxError() //每个ajax失败时调用
// .ajaxSuccess() //每个jax成功时调用
// .ajaxSend() //每个ajax发送前调用

// .ajaxStart() //在第一个ajax发送时调用
// .ajaxStop() //当所有的ajax完成时调用

;
(function () {
  $(document).ajaxStart(function () {
    NProgress.start()
  })
  $(document).ajaxStop(function () {
    setTimeout(() => {
      NProgress.done()
    }, 500);
  })
})();


; /* 公共功能 */
(function () {
  //5.如果用户没有登录,需要拦截到登录页面
  //注:需要将登录页排除在外
  (location.href.indexOf('login.html') === -1) && $.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    dataType: 'json',
    success: function (info) {
      info.error === 400 && (location.href = './login.html')
    }
  })


  //1.左侧二级菜单显示隐藏
  $('.lt_aside .categroy').on('click', function () {
    $('.lt_aside .second_nav').slideToggle()
  })


  //2.显示隐藏侧边栏
  $('.icon_menu').on('click', function () {
    $('.lt_aside').toggleClass('hidemenu')
    $('.lt_main').toggleClass('hidemenu')
    $('.lt_topbar').toggleClass('hidemenu')
    $('.container-fluid').toggleClass('hidemenu')
  })

  //3.退出按钮
  $('.lt_main .icon_logout').on('click', function () {
    $('#myModal').modal('show')
  })

  //4.点击模态框中的退出按钮,需要进行退出操作(ajax)
  $('.modal .btn-primary').on('click', function () {
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      dataType: 'json',
      success: function (info) {
        info.success && (location.href = './login.html')
      }
    })
  })


})();