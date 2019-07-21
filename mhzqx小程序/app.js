//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.getUserInfo({
          success: res => {
            this.globalData.userInfo = res.userInfo
          }
        })
        wx.request({
          url: this.globalData.serveraddr + '/customer/getopenid',
          data: {
            code: res.code
          },
          success: res => {
            this.globalData.openid = res.data.openid
            var that = this
            if (this.globalData.openid) {
              wx.request({
                url: that.globalData.serveraddr + '/customer/login',
                //data是需要传递到后端的两个参数，参数名称需要和Customer类中的属性名一致
                data: "nickname=" + that.globalData.userInfo.nickName + "&openid=" + that.globalData.openid,
                method: "POST",
                header: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                success: r => {
                  //如果r.data>0，那么说明登录注册成功，那么需要跳转到菜单页面。否则说明登录注册失败，那么应该给客户一个提示
                  if (r.data.result.code == 200) {
                    //成功，后续逻辑：判断用户是否有正在处理的订单，如果有，那么跳转到订单页面；如果没有跳转到菜单页面。                   
                    that.globalData.limit = r.data.result.limit;        
                    that.globalData.cusid = r.data.result.cusid
                    that.globalData.isHaveOrder = r.data.result.isHaveOrder
                    that.globalData.isLogin = true
                    if (r.data.result.isAdmin) {
                      that.globalData.isAdmin = true
                    }
                  } else {
                    //失败
                    wx.showModal({
                      title: '提示',
                      content: '用戶获取失败'
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 其他界面监听app.globalData，而不是在app.js中监听，而且这个监听方法，需要一个回调方法。
  watch: function (method) {
    var obj = this.globalData;
    Object.defineProperty(obj, "isAdmin", {
      configurable: true,
      enumerable: true,
      set: function (value) {
        this._isAdmin = value;
        method(value);
      },
      get: function () {
        // 可以在这里打印一些东西，然后在其他界面调用getApp().globalData.isAdmin的时候，这里就会执行。
        return this._isAdmin
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: null,
    isLogin: false,
    isAdmin: false,
    serveraddr: "http://127.0.0.1:3000",
    cusid: null,
    isHaveOrder: false,
    limit: false,
  }
})