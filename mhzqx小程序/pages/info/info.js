// client/pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodinfo: {
      "gid": "89e8ec77-8820-48c1-9d4e-f001f093ff93",
      "gtid": "1",
      "gname": "饭团",
      "gprice": 30,
      "gstate": 1,
      "gimg": "food6.png",
      "gtime": 30,
      "gcontent": "周一至周六\n\n",
      "gcount": 0,
      "gremark": 233,
      "ginfo": {
        component: "优质大米",
        supplier: "买买提超级市场大米直销",
        describe: "这是一份儿非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常香的米饭，嗯，真香。"
      }
    },
    swiperCurrent: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 800,
    circular: true,

    contactList: [{
      // 菜品id
        "gid": "72374eee-c5a5-4b54-b007-7ce5e7ffbb0e",
        // 菜品种类
        "gtid": "1",
        // 菜品名
        "gname": "烤串儿",
        // 价格
        "gprice": 30,
        // "gstate": 1,
        // 图片
        "gimg": "food4.png",
        // 原价
        "gtime": 20,
        // 描述
        "gcontent": "周日供应\n\n",
        // 菜品数量
        "gcount": 0,
        // 评论数
        "gremark": 233,
        // 详细信息
        "ginfo": {
          // 原材料
          component: "优质羊肉",
          // 供应商
          supplier: "买买提超级市场羊肉直销",
          // 详细描述
          describe: "这是一份儿非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常香的烤串，嗯，真香。"
        },
      }, {
        "gid": "89e8ec77-8820-48c1-9d4e-f001f093ff93",
        "gtid": "1",
        "gname": "饭团",
        "gprice": 30,
        "gstate": 1,
        "gimg": "food6.png",
        "gtime": 30,
        "gcontent": "周一至周六\n\n",
        "gcount": 0,
        "gremark": 233,
        "ginfo": {
          component: "优质大米",
          supplier: "买买提超级市场大米直销",
          describe: "这是一份儿非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常香的米饭，嗯，真香。"
        }
      },
      {
        "gid": "2055204c-ed46-4ba1-890a-fd69f10353d8",
        "gtid": "1",
        "gname": "面条",
        "gprice": 50,
        "gstate": 1,
        "gimg": "food7.png",
        "gtime": 40,
        "gcontent": "周一至周六\n\n",
        "gcount": 0,
        "gremark": 233,
        "ginfo": {
          component: "优质面粉",
          supplier: "买买提超级市场面粉直销",
          describe: "这是一份儿非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常香的面条，嗯，真香。"
        }
      },
      {
        "gid": "4b9363b7-a4f8-4329-8024-b53386cf4ddc",
        "gtid": "3",
        "gname": "咖啡",
        "gprice": 50,
        "gstate": 1,
        "gimg": "food3.png",
        "gtime": 30,
        "gcontent": "周三到周五供应\n\n",
        "gcount": 0,
        "gremark": 233,
        "ginfo": {
          component: "优质咖啡豆",
          supplier: "买买提超级市场咖啡直销",
          describe: "这是一份儿非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常非常香的咖啡，嗯，真香。"
        }
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    this.setData({
      foodinfo: JSON.parse(e.foodinfo)
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
  //轮播图的切换事件

  swiperChange: function(e) {
    this.setData({
      swiperCurrent: e.detail.current

    })

  },
  goinfo: function(e) {
    var contact = this.data.contactList;
    for (var i = 0; i < contact.length;i++)
    {
      if (e.currentTarget.dataset.gid == contact[i].gid)
      {
        var food = contact[i];
        contact.splice(i,1,this.data.foodinfo);  
        this.setData({
          foodinfo: food,
          contactList:contact
        })
      }
      console.log(this.data.contactList);
    }
  },
  //点击指示点切换
  chuangEvent: function(e) {
    this.setData({
      swiperCurrent: e.currentTarget.id
    })
  },
})