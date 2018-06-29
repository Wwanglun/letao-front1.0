/**
 * Created by 52424 on 2018/6/29.
 */
$(function () {
  // 把搜索的信息存储在localStorage中, 页面加载时, 取出数据动态渲染
  var arr = []
  function getArr() {
    var str = localStorage.getItem('searchInfo') || '[]'
    return arr = JSON.parse(str)
  }

  function render(arr) {
    $('.history').html(template('tmp', {arr: arr}))
  }

  render( getArr())
  // 点击清空数据
  $('.history').on('click', '.clearBtn', function () {
    localStorage.removeItem('searchInfo')
    mui.confirm('确定清空历史记录', '提示框', ['取消', '确定'], function (e) {
      //console.log(e);
      if (e.index === 1) {
        render(getArr())
      }
    })
  })

  // 点击删除数据
  $('.history').on('click', 'i', function () {
    var index = $(this).parent().data('index')
    arr.splice(index, 1)
    localStorage.setItem('searchInfo', JSON.stringify(arr))
    render(getArr())
  })

  // 点击搜索添加数据
  $('.searchBtn').click(function () {
    arr = getArr()
    var txt = $('.search-input input').val()
    if (txt === '') {
      mui.toast('请输入搜索关键字')
      return
    }

    if (arr.length > 6) {
      arr.pop()
    }

    var index = arr.indexOf(txt)
    if (index > -1) {
      arr.splice(index, 1)
    }

    arr.unshift(txt)
    localStorage.setItem('searchInfo', JSON.stringify(arr))
    render(arr)

    $('.search-input input').val('')

    location.href = 'product.html?key=' + txt
  })
})