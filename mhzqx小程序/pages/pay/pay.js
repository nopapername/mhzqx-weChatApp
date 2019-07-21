// client/pages/pay/pay.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radioItems: [{
        name: "微信支付",
        value: 'wx',
        img: 'wx.png',
        checked: 'true'
      },
      {
        name: "QQ支付",
        value: 'qq',
        img: 'qq.png'
      },
    ],
    sumprice: 0,
    foodlist: [],
    isPay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {

    this.setData({
      sumprice: e.sumprice,
      foodlist: JSON.parse(e.foodlist),
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
  openToast: function() {
    if (!this.data.isPay) {
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 3000
      });
      this.setData({
        isPay: true
      })
      wx.request({
        url: app.globalData.serveraddr + '/order',
        data: {
          foodlist: JSON.stringify(this.data.foodlist),
          cusid: app.globalData.cusid
        },
        method: 'POST',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          console.log(res)
        }
      })
    }
  },
  radioChange: function(e) {

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems
    });
  },
  goorder: function() {
    if (this.data.isPay) {
      wx.redirectTo({
        url: '../order/order'
      })
    } else {
      wx.showToast({
        title: '请支付后查看订单',
        icon: 'none',
        duration: 2000
      });
    }
  }
})