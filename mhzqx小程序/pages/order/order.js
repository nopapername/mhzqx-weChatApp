// pages/order/order.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodlist: [],
    overlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    wx.request({
      url: app.globalData.serveraddr + '/order/getOrders',
      data: {
        cusid: app.globalData.cusid
      },
      success: res => {
        this.setData({
          overlist: res.data.overOrder.reverse()
        })
        console.log(this.data.overlist)
        var foodlist = []
        var orderlist = []
        for (let i = 0; i < res.data.order.length; i++) {
          var order = {
            orderid: '',
            orderPrice: 0,
            foods: []
          }
          order.orderid = res.data.order[i].ORDERID
          order.orderPrice = res.data.order[i].ORDERTOTLEPRICE
          order.orderTime = res.data.order[i].ORDERTIME
          order.orderNum = res.data.order[i].ORDERNUM
          order.orderState = res.data.order[i].ORDERSTATE
          order.orderSort = res.data.order[i].orderSort
          for (let k = 0; k < res.data.orderDetailAll.length; k++) {
            for (let j = 0; j < res.data.orderDetailAll[k].length; j++) {
              if (order.orderid == res.data.orderDetailAll[k][j].ORDERID) {
                order.foods.push(res.data.orderDetailAll[k][j].GNAME + '*' + res.data.orderDetailAll[k][j].GCOUNT)
              }
            }
          }
          foodlist.push(order)
        }
        for (let i = 0; i < foodlist.length; i++) {
          if (foodlist[i].orderState == 1) {
            orderlist.push(foodlist[i])
          }
        }
        this.setData({
          foodlist: orderlist.reverse()
        })
      }
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
  agin: function() {
    wx.redirectTo({
      url: '../menu/menu',
    })
  }
})