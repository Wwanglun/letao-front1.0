/**
 * Created by 52424 on 2018/6/28.
 */
$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false
  });

  // 打开页面渲染一级分类目录
  $.ajax({
    type: 'get',
    url: '/category/queryTopCategory',
    dataType: 'json',
    success: function (info) {
      console.log(info);
      $('.cateOne').html(template('tmp', info))
      renderCateSecond(info.rows[0].id)
    }
  })

  // 点击一级分类目录显示二级
  $('.cateOne').on('click', 'li', function () {
    var id = $(this).data('id')
    renderCateSecond(id)
    $(this).addClass('now').siblings().removeClass('now')
  })


  function renderCateSecond (id) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategory',
      data: {
        id: id
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        $('.cateSecond').html(template('tpl', info))
      }
    })
  }
})