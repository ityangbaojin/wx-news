var WxParse = require('../../resources/wxParse/wxParse.js');
Page({
  data: {
  },
  onReady() {
    wx.setNavigationBarTitle({
      title: '详情页面'
    })
  },
  onLoad(options) {
    var that = this;
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/' + options.id,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      success(res) {
        var body = res.data.body;
        WxParse.wxParse('body', 'html', body, that);
        that.setData({
          art: res.data
        })
      }
    })
  }
})