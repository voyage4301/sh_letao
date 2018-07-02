$(function () {


  // 渲染用户信息
  function render() {
    $.ajax({
      type: 'get',
      url: '/user/queryUserMessage',
      dataType: 'json',
      success: function (info) {
        $('#userInfo').html(template('userList', info))
      }
    })
  }

  render()

  // 退出功能
  $('#logOut').on('click', function () {
    $.ajax({
      type: 'get',
      url: '/user/logout',
      dataType: 'json',
      success: function (info) {
        if (info.success) {
          location.href = './login.html'
        }
      }
    })
  })
})