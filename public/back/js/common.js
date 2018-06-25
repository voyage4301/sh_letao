// ajax全局事件
// .ajaxComplete() //每个ajax完成时调用,无论成功与否
// .ajaxError() //每个ajax失败时调用
// .ajaxSuccess() //每个jax成功时调用
// .ajaxSend() //每个ajax发送前调用

// .ajaxStart() //在第一个ajax发送时调用
// .ajaxStop() //当所有的ajax完成时调用

$(document).ajaxStart(function () {
  NProgress.start()
})
$(document).ajaxStop(function () {
  setTimeout(() => {
    NProgress.done()
  }, 500);
})