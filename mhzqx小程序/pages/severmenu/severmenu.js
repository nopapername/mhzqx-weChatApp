// client/pages/menu/menu.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 导航栏
    tabs: ["订单管理", "菜品管理", "人员管理"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    // 卡片一订单
    orderlist: [],
    // 卡片二菜单
    datalist: [],
    serveraddr: '',
    // 人员管理
    adminlist: [],
    addflag: false,
    limitflag: false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    // 微信发送接收数据
    wx.request({
      url: app.globalData.serveraddr + '/admin',
      data: {},
      success: res => {
        that.setData({
          adminlist: res.data.res
        })
      }
    })
    wx.request({
      url: app.globalData.serveraddr + '/foodadmin',
      data: {},
      success: res => {
        this.setData({
          datalist: res.data
        })
      }
    })
    this.setData({
      limitflag: app.globalData.limit,
      serveraddr: app.globalData.serveraddr,
    });
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
    wx.request({
      url: app.globalData.serveraddr + '/order/getOrderAdmin',
      success: res => {
        console.log(res)
        this.setData({
          orderlist: res.data.cusOrderArr
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 自定义函数
  // 导航栏
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  // 卡片二 菜单管理
  gotouser: function () {
    wx.navigateTo({
      url: '../menu/menu',
    })
  },
  open: function () {
    wx.navigateTo({
      url: '../severaddfood/severaddfood',
    })
  },
  alertfood: function (e) {
    var list = this.data.datalist;
    for (var i = 0; i < list.length; i++) {
      if (list[i].gt.GTID == e.currentTarget.dataset.gtid) {
        var glist = list[i].goodslist
        for (var j = 0; j < glist.length; j++) {
          if (glist[j].GID == e.currentTarget.dataset.gid) {
            wx.navigateTo({
              url: '../severalertfood/severalertfood?foodinfo=' + JSON.stringify(glist[j])
            })
          }
        }
      }
    }
  },
  goinfo: function (e) {
    var list = this.data.datalist;
    for (var i = 0; i < list.length; i++) {
      if (list[i].gt.GTID == e.currentTarget.dataset.gtid) {
        var glist = list[i].goodslist
        for (var j = 0; j < glist.length; j++) {
          if (glist[j].GID == e.currentTarget.dataset.gid) {
            wx.navigateTo({
              url: '../severinfo/severinfo?foodinfo=' + JSON.stringify(glist[j])
            })
          }
        }
      }
    }
  },
  // 卡片三管理员
  submitadd: function (e) {
    var admin = {
      cusid: '',
      name: '',
    }
    admin.cusid = e.detail.value.id;
    admin.name = '位管理员:' + e.detail.value.id;
    wx.request({
      url: app.globalData.serveraddr + '/admin/add',
      data: {
        admin: admin,
      },
      success: res => {
        this.setData({
          adminlist: res.data.res,
          addflag: false,
        })
        console.log(res.data.res);
      }
    })

  },
  subtract: function (e) {
    console.log(e.target.dataset.id)
    wx.request({
      url: app.globalData.serveraddr + '/admin/subtract',
      data: {
        cusid: e.target.dataset.id,
      },
      success: res => {
        this.setData({
          adminlist: res.data.res
        })
        console.log(res.data.res);
      }
    })
  },
  add: function () {
    this.setData({
      addflag: true
    })
  },
  // 卡片一
  cancel: function (e) {
    console.log(e.target.dataset.id)
    wx.request({
      url: app.globalData.serveraddr + '/order/orderAdminCancel',
      data: {
        orderid: e.target.dataset.id,
      },
      success: res => {
        if (res.data.result.code == 200) {
          wx.showToast({
            title: '订单已取消',
            icon: 'success',
            duration: 2000
          })
          wx.request({
            url: app.globalData.serveraddr + '/order/getOrderAdmin',
            success: res => {
              console.log(res)
              this.setData({
                orderlist: res.data.cusOrderArr
              })
            }
          })
        } else {
          wx.showToast({
            title: '订单取消错误',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  over: function (e) {
    console.log(e.target.dataset.id)
    wx.request({
      url: app.globalData.serveraddr + '/order/orderAdminOver',
      data: {
        orderid: e.target.dataset.id,
      },
      success: res => {
        if (res.data.result.code == 200) {
          wx.showToast({
            title: '订单已完成',
            icon: 'success',
            duration: 2000
          })
          wx.request({
            url: app.globalData.serveraddr + '/order/getOrderAdmin',
            success: res => {
              console.log(res)
              this.setData({
                orderlist: res.data.cusOrderArr
              })
            }
          })
        } else {
          wx.showToast({
            title: '订单完成错误',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
})