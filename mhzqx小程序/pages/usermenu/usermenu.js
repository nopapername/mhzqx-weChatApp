// client/pages/pay/pay.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myfoodsList: [],
    sumprice: 0,
    serveraddr: app.globalData.serveraddr
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    this.setData({
      myfoodsList: JSON.parse(e.foodslist),
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var sum = 0;
    for (var i = 0; i < this.data.myfoodsList.length; i++) {
      sum = sum + this.data.myfoodsList[i].gcount * this.data.myfoodsList[i].gprice;
    }
    console.log(this.data.myfoodsList.length);
    this.setData({
      sumprice: sum,
    })
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  goinfo: function(e) {
    var list = this.data.myfoodsList;
    for (var i = 0; i < list.length; i++) {
      if (list[i].gid == e.currentTarget.dataset.gid) {
        wx.navigateTo({
          url: '../info/info?foodinfo=' + JSON.stringify(list[i])
        })
      }
    }
  },
  gopay: function() {
    wx.redirectTo({
      url: '../pay/pay?sumprice=' + this.data.sumprice + '&foodlist=' + JSON.stringify(this.data.myfoodsList),
    })
  }
})