// pages/severaddfood/severaddfood.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodinfo: {},
    typeinfo: {
      "gtid": "1",
      "gtname": "主食",
    },
    radioItems: [{
      name: '主食',
      value: '0'
    },
    {
      name: '水果',
      value: '1',
    },
    {
      name: '甜点',
      value: '2',
    }
    ],
    files: [],
    newtypename: null,
    moreflag: false,
    showTopTips: false,
    warning: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var radioItems = []
    wx.request({
      url: app.globalData.serveraddr + '/foodadmin/getGoodType',
      success: res => {
        for (let i = 0; i < res.data.goodstypes.length; i++) {
          var items = {}
          items.name = res.data.goodstypes[i].GTNAME
          items.value = res.data.goodstypes[i].GTID - 1
          if (res.data.goodstypes[i].GTID == 1) {
            items.checked = true
          } else {
            items.checked = false
          }
          radioItems.push(items)
        }
        this.setData({
          radioItems: radioItems
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

  // 自定义函数
  radioChange: function (e) {
    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }
    this.setData({
      radioItems: radioItems
    });
  },
  addmore: function () {
    this.setData({
      moreflag: true
    });
  },
  submitmore: function (e) {
    this.setData({
      newtypename: e.detail.value.typename
    });
    wx.request({
      url: app.globalData.serveraddr + '/foodadmin/addGoodType',
      data: {
        newtypename: e.detail.value.typename,
        gtid: this.data.radioItems.length + 1
      },
      success: res => {
        console.log(res)
      }
    })
    var newtype = {
      name: "",
      value: '',
      checked: true
    };

    newtype.value = this.data.radioItems.length.toString();
    this.data.typeinfo.gtid = this.data.radioItems.length.toString();
    newtype.name = this.data.newtypename;
    this.data.typeinfo.gtname = this.data.newtypename;
    for (var i = 0; i < this.data.radioItems.length; i++) {
      this.data.radioItems[i].checked = false;
    }
    this.data.radioItems.push(newtype);
    this.setData({
      radioItems: this.data.radioItems,
      moreflag: false,
      typeinfo: this.data.typeinfo,
    });
    console.log(newtype, this.data.radioItems);
  },
  chooseImage: function (e) {
    var that = this;
    console.log(e);
    this.setData({
      files: [],
    });
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      },
    });
  },
  submit: function (e) {
    var that = this
    
    var warningflag = false;
    console.log(e.detail.value.foodname);
    if (e.detail.value.foodname == '') {
      this.setData({
        warning: "请输入菜品名称",
      })
      warningflag = true;
    } else {
      this.data.foodinfo.gname = e.detail.value.foodname;
      if (e.detail.value.foodprice == '') {
        this.setData({
          warning: "请输入价格",
        })
        warningflag = true;
      } else {
        this.data.foodinfo.gprice = e.detail.value.foodprice;
        this.data.foodinfo.goprice = e.detail.value.foodprice;
        if (e.detail.value.foodtime == '') {
          this.setData({
            warning: "请输入供应时段",
          })
          warningflag = true;
        } else {
          this.data.foodinfo.gcontent = e.detail.value.foodtime;
          if (e.detail.value.fooddiscribe == '') {
            this.setData({
              warning: "请输入供应时段",
            })
            warningflag = true;
          } else {
            this.data.foodinfo.ginfo = e.detail.value.fooddiscribe;
            if (this.data.files == '') {
              this.setData({
                warning: "请添加图片",
              })
              warningflag = true;

            } 
            else {
              this.data.foodinfo.gimg = this.data.files;
              for (var i = 0; i < this.data.radioItems.length; i++) {
                if (this.data.radioItems[i].checked == true)
                  this.data.foodinfo.gtid = i + 1;
              }
            }
          }
        }
      }
    }
    if (warningflag == true) {
      var that = this;
      this.setData({
        showTopTips: true
      });
      setTimeout(function () {
        that.setData({
          showTopTips: false
        });
      }, 3000);
    } else {
      wx.request({
        url: app.globalData.serveraddr + '/foodadmin/addGoods',
        data: {
          foodinfo: this.data.foodinfo,
        },
        success: res => {
          console.log(res)
          if (res.data.result.code == 200) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1000
            });
            wx.reLaunch({
              url: '../severmenu/severmenu'
            })
          } else {
            wx.showToast({
              title: '提交失败',
              icon: 'none',
              duration: 1000
            });
          }
        }
      })
      this.setData({
        foodinfo: this.data.foodinfo,
      });
      console.log(this.data.foodinfo);
      if (true) {
        console.log(this.data.foodinfo);
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000
        });
        wx.reLaunch({
          url: '../severmenu/severmenu'
        })
      } else {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          duration: 3000
        });
      }
    }

    wx.uploadFile({
      url: app.globalData.serveraddr + '/foodadmin/addGoodsImg', //app.ai_api.File.file
      filePath: that.data.files[0],  //文件路径  这里是mp3文件
      name: 'fileImg',  //随意
      formData: {
        'user': 'test'
      },
      success(res) {
        const data = res.data
        console.log(res)
        //do something
      }
    })
  },

})