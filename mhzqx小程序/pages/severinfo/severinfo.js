var app = getApp()
// client/pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodinfo: {},
    serveraddr: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    this.setData({
      foodinfo: JSON.parse(e.foodinfo),
      serveraddr: app.globalData.serveraddr,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },
  // 自定义函数
  cut: function() {

    console.log(this.data.foodinfo.GID)
    wx.request({
      url: app.globalData.serveraddr + '/foodadmin/uninstall',
      data: {
        foodinfo:this.data.foodinfo.GID,
      },
      success(res) {
        if (res.data.result.code == 200) {
          wx.showToast({
            title: '下架成功',
            icon: 'success',
            duration: 3000
          });
          wx.reLaunch({
            url: '../severmenu/severmenu',
          })
        } else {
          wx.showToast({
            title: '下架失败',
            icon: 'success',
            duration: 3000
          });
        }
      }
    })
  }
})