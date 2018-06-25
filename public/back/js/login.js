/* 
表单校验功能!
  1:用户名不能为空,2-6位
  2:密码非空,6-12位
*/

; //表单校验
(function () {
  $('#form').bootstrapValidator({
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
          }
        }
      }
    }
  })

})();