$(function () {

  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  })


})

function getSearchObj(name) {
  var searchInfo = location.search //获取地址栏后拼接的字符串
  searchInfo = decodeURI(searchInfo) //将字符串转码
  searchInfo = searchInfo.slice(1) //slice方法不会改变原字符串

  var arr = searchInfo.split('&'),
    obj = {}

  arr.forEach(function (v, i) {
    var tempArr = v.split('='),
      k = tempArr[0],
      value = tempArr[1]
    obj[k] = value
  })
  return obj[name]
}