// client/pages/menu/menu.js
var app = getApp();
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var foodList = [];
// var myData=[{id:1,name:"菜"},{id:2,name:"肉"}];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    foodNum: 0,
    sumprice: 0,
    psumprice: 0,
    mydata: [],
    myfoodList: [],
    // user: {
    //   sumPrice: sumprice,
    //   foodName: [],
    // },
    serveraddr: app.globalData.serveraddr
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
    // console.log(foodList);
    wx.request({
      url: app.globalData.serveraddr + '/menu',
      success: res => {
        // console.log(res.data)
        var gtList = []
        // 取数据
        for (var i = 0; i < res.data.gtlist.length; i++) {
          gtList.push(res.data.gtlist[i].gt);
        }
        this.setData({
          tabs: gtList,
          mydata: res.data.gtlist
        })
        wx.getSystemInfo({
          success: function (res) {
            that.setData({
              sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
              sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
            });
          }
        });
      }
    })
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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

  // 自定义函数

  // 购物出加
  add: function(e) {
    var list = this.data.mydata;
    for (var i = 0; i < list.length; i++) {
      if (list[i].gt.gtid == e.currentTarget.dataset.gtid) {
        var glist = list[i].goodslist
        for (var j = 0; j < glist.length; j++) {
          if (glist[j].gid == e.currentTarget.dataset.gid) {
            glist[j].gcount += 1;
            var sumnum = this.data.foodNum + 1;
            var sum = this.data.sumprice + e.currentTarget.dataset.gprice;
            var psum = this.data.psumprice + e.currentTarget.dataset.gtime;
            this.setData({
              mydata: list,
              foodNum: sumnum,
              sumprice: sum,
              psumprice: sum,
            })
          }
        }
      }
    }
  },
  subtract: function(e) {
    var list = this.data.mydata;
    for (var i = 0; i < list.length; i++) {
      if (list[i].gt.gtid == e.currentTarget.dataset.gtid) {
        var glist = list[i].goodslist
        for (var j = 0; j < glist.length; j++) {
          if (glist[j].gid == e.currentTarget.dataset.gid) {
            if (glist[j].gcount > 0) {
              glist[j].gcount -= 1;
              var sumnum = this.data.foodNum - 1;
              var sum = this.data.sumprice - e.currentTarget.dataset.gprice;
              var psum = this.data.psumprice - e.currentTarget.dataset.gtime;
              this.setData({
                mydata: list,
                foodNum: sumnum,
                sumprice: sum,
                psumprice: psum,
              })
            }
          }
        }
      }
    }
  },
  goinfo: function(e) {

    var list = this.data.mydata;
    for (var i = 0; i < list.length; i++) {
      if (list[i].gt.gtid == e.currentTarget.dataset.gtid) {
        var glist = list[i].goodslist
        for (var j = 0; j < glist.length; j++) {
          if (glist[j].gid == e.currentTarget.dataset.gid) {
            wx.navigateTo({
              url: '../info/info?foodinfo=' + JSON.stringify(glist[j])
            })
          }
        }
      }
    }
  },
  pay: function() {
    var foodlist = new Array();
    for (var i = 0; i < this.data.mydata.length; i++) {
      for (var j = 0; j < this.data.mydata[i].goodslist.length; j++) {
        if (this.data.mydata[i].goodslist[j].gcount > 0) {
          foodlist.push(this.data.mydata[i].goodslist[j])
        }
      }
    }
    this.setData({
      myfoodList: foodlist
    })
    console.log(this.data.myfoodList)
    wx.navigateTo({
      url: '../usermenu/usermenu?foodslist=' + JSON.stringify(this.data.myfoodList)
    })
  },
})