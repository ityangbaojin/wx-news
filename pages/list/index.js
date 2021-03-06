Page({
  data: {
    list: {}
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: this.title
    })
  },
  onLoad: function (options) {
    var that = this
    this.title = options.title
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/theme/' + options.id,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          list: res.data.stories
        })
      }
    })
  }
})