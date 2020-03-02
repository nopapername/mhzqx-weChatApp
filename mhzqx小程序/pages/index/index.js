// client/pages/login.js
const app = getApp()

Page({
  data: {
  },

  onLoad: function () {
    
  },
  onGotUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      wx.navigateTo({
        url: '../login/login'
      })
    } else {
      wx.showToast({
        title: '登录信息获取失败！',
        icon: "none",
        duration: 1000,
        mask: true
      })
    }
  },
})