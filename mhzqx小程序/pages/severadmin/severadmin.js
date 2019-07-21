// pages/severadmin/severadmin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adminlist: [{
      id: '1',
      avtar: "../img/uservatar.png",
      name: "张三宝"
    }, {
      id: '2',
      avtar: "../img/uservatar.png",
      name: "欧阳甩锅"
    }, {
      id: '3',
      avtar: "../img/uservatar.png",
      name: "彭于艳"
    }, ],
    addflag: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
  submitadd: function(e) {
    var admin = {
      id: '3',
      avtar: "../img/uservatar.png",
      name: ""
    }
    admin.id = e.detail.value.id;
    admin.name = e.detail.value.id;
    this.data.adminlist.push(admin);
    this.setData({
      adminlist: this.data.adminlist,
      addflag: false,
    })
  },
  subtract: function(e) {
    console.log(e.target.dataset.id)
  },
  add: function() {
    this.setData({
      addflag: true
    })
  },
})