$(function () {
  //1.搜索历史记录渲染(渲染之前需要在本地存储)
  // var data = ['阿迪', '耐克', '匡威'],
  //   jsstr = JSON.stringify(data)
  // localStorage.setItem('value', jsstr)


  //2.清除历史记录时,页面需要重新渲染
  function getHistory(key) {
    var history = localStorage.getItem(key) || '[]'
    var arr = JSON.parse(history)
    return arr
  }

  //读取,进行渲染
  function render() {
    $('.history_content').html(template('historyList', {
      list: getHistory('value')
    }))
  }

  render()
  // 3.清空
  $('#clearHistory').on('click', function () {
    // 添加提示框
    // mui.confirm(message,title,btnVlaue,callback[,type])
    mui.confirm('你确定要清空所有历史记录吗?', '温馨提示', ['取消', '确认'], function (e) {
      if (e.index === 1) {
        localStorage.removeItem('value')
        render()
      }
    })
  })

  //4.删除
  $('.history_content').on('click', 'i', function () {
    var index = $(this).data('index'),
      arr = getHistory('value')
    arr.splice(index, 1)
    localStorage.setItem('value', JSON.stringify(arr))
    render()
  })

  //5.添加搜索功能
  $('.search-btn').on('click', function () {
    var newVal = $('.search-input').val()

    if (newVal === '') {
      mui.toast('调皮! o(*￣︶￣*)o')
      return
    }
    var arr = getHistory('value'),
      index = arr.indexOf(newVal)

    index !== -1 && arr.splice(index, 1) //删除相同的项目
    arr.unshift(newVal) //

    arr.length > 10 && arr.pop() //限制条数

    localStorage.setItem('value', JSON.stringify(arr)) //新增
    render() //重新渲染

    $('.search-input').val('') //重置搜索框

    location.href = 'searchList.html?key=' + newVal
  })
})