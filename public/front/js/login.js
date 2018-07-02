$(function () {


  // 1.登录功能

  $('#loginBtn').on('click', function () {
    var username = $("[name='username']").val().trim()
    var password = $("[name='password']").val().trim();
    if (!username || !password) {
      mui.toast('用户名和密码不能为空')
      return
    }



    $.ajax({
      type: 'post',
      url: '/user/login',
      data: {
        username: username,
        password: password
      },
      dataType: 'json',
      success: function (info) {
        if (info.error) {
          mui.toast('用户名或密码错误')
        } else {
          var search = location.search;
          if (search.indexOf("retUrl") !== -1) {
            var link = search.slice(8)
            location.href = link
          } else {
            location.href = 'user.html'
          }
        }

      }
    })
  })
})