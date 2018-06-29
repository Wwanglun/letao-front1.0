/**
 * Created by 52424 on 2018/6/29.
 */
$(function () {
  var proName = getSrcObj('key')


  $('.search-input input').val(proName)
  // 点击搜索页的搜索和历史记录搜索信息
  function render() {
    var option = {}
    option.proName = $('.search-input input').val()
    option.page = 1
    option.pageSize = 100

    if ($('.pro-info a.current').length > 0) {
      var k = $('.pro-info a.current').data('type')
      var v = $('.pro-info a.current').find('i').hasClass('fa-angle-down') ? 2 : 1
      option[k] = v
    }
    $.ajax({
      type: 'get',
      url: '/product/queryProduct',
      data: option,
      dataType: 'json',
      success: function (info) {
        console.log(info);
        $('.index-product').html(template('tmp', info))
      }
    })
  }

  setTimeout(render, 500)


  // 点击商品页的搜索
  $('.searchBtn').click(function () {
    var txt = $('.search-input input').val()
    var str = localStorage.getItem('searchInfo')
    var arr = JSON.parse(str)
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

    render()
  })

  // 点击价格/ 库存 显示排序
  $('.pro-info a[data-type]').click(function () {

    $('.index-product').html('<div class="loading"></div>')

    if ($(this).hasClass('current')) {
      $(this).find('i').toggleClass('fa-angle-down').toggleClass('fa-angle-up')
    } else {
      $(this).addClass('current').siblings().removeClass('current')
    }
    setTimeout(render, 500)
  })
})