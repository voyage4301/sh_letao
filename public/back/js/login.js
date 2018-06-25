$(function () {

  ; //表单校验
  (function () {
    $('#form').bootstrapValidator({
      // 配置图标
      feedbackIcons: {
        valid: 'glyphicon glyphicon-ok', //校验成功
        invalid: 'glyphicon glyphicon-remove', //校验失败
        validating: 'glyphicon glyphicon-refresh' //较严重
      },
      //指定校验字段
      fields: {
        username: {
          //配置校验规则
          validators: {
            notEmpty: {
              message: '用户名不能为空!'

            },
            //配置长度校验
            stringLength: {
              min: 2,
              max: 6,
              message: '用户名长度为2-6位!'
            },
            callback: { //定制一个专门用于响应回调的校验规则
              message: '用户名不存在!'
            }
          }
        },
        password: {
          //配置校验规则
          validators: {
            notEmpty: {
              message: '密码不能为空!'

            },
            //配置长度校验
            stringLength: {
              min: 6,
              max: 12,
              message: '密码长度为6-12位!'
            },
            callback: {
              message: '密码错误!'
            }
          }
        }
      }
    })

  })();

  ; //注册表单校验成功事件,阻止默认的表单提交,使用ajax提交
  (function () {
    $('#form').on('success.form.bv', function (e) {
      e.preventDefault() //阻止默认的表单提交

      $.ajax({
        type: 'post',
        url: '/employee/employeeLogin',
        data: $('#form').serialize(),
        dataType: 'json',
        success: function (info) {
          if (info.success) {
            location.href = '../back/index.html'
          } else {
            switch (info.error) {
              case 1000:
                $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
                break;
              case 1001:
                $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
                break;
            }
          }
        }
      })
    })
  })();

  ; //重置表单的bug,
  (function () {
    $('#btn-reset').on('click', function () {
      $('#form').data('bootstrapValidator').resetForm()
    })
  })();
})