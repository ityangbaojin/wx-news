var utils = require('../../resources/utils/util.js')
Page({
  data: {
    list: [],
    duration: 2000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        that.setData({
          banner: res.data.top_stories,
          list: res.data.stories
        })
      }
    })
    this.index = 1
  },
  // 事件处理函数
  bindViewTap(e) {
    wx.navigateTo({
      url: '../detail/index?id=' + e.target.dataset.id
    })
  },
  loadMore (e) {
    if (this.data.list.length === 0) return
    var date = this.getNextDate()
    var that = this
    that.setData({ loading: true })
    wx.request({
      url: 'https://news.at.zhihu.com/api/4/news/before/' + (Number(utils.formatDate(date)) + 1),
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success (res) {
         that.setData({
           loading: false,
           list: that.data.list.concat(res.data.stories)
         })
      }
    })
  },
  getNextDate (){
    const now = new Date()
    now.setDate(now.getDate() - this.index++)
    return now
  },

})