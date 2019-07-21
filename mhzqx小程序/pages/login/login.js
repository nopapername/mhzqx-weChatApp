// client/pages/login.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isAdmin: false
  },

  onLoad: function () {
    getApp().watch((value) => {
      this.setData({
        isAdmin: value
      })
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    if (app.globalData.isLogin) {
      //成功，后续逻辑：判断用户是否有正在处理的订单，如果有，那么跳转到订单页面；如果没有跳转到菜单页面。
      if (app.globalData.isHaveOrder) {
        wx.navigateTo({
          url: '../order/order'
        })
      } else {
        wx.navigateTo({
          url: '../menu/menu'
        })
      }
    } else {
      //失败
      wx.showToast({
        title: '请稍后，正在获取登录信息！',
        icon: "none",
        duration: 1000,
        mask: true
      })
    }
  },
  openadmin: function () {
    wx.navigateTo({
      url: '../severmenu/severmenu'
    })
  },
})