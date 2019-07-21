var express = require('express');
var router = express.Router();
var request = require('request')
var mysql = require('mysql')
var dbConfig = require('../db/dbConfig')
var uuid = require('node-uuid')
var customerSql = require('../db/customerSql')
var syscusSql = require('../db/syscusSql')
var orderSql = require('../db/orderSql')

var pool = mysql.createPool(dbConfig.mysql)
var responseJSON = function (res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '-200',
      msg: '操作失败'
    })
  } else {
    res.json(ret)
  }
}

/* 获取openid
		 * appid=wxc449411fab1b45b8(微信小程序的id)
		 * secret=645cc9ba8cf29fc5fa683047e3ed859（每个人的密钥，需要到微信小程序平台中去获取）
		 * js_code:小程序传递过来的code属性
		 */
router.get('/getopenid', function(req, res, next) {
  var param = req.query || req.params
  var code = param.code
  var wx_url = 'https://api.weixin.qq.com/sns/jscode2session?appid=wxc7f540d89f35da73&secret=c9156a7da5d4f22abecbcc6b54a290ae&js_code='
  + code + '&grant_type=authorization_code'
  request(wx_url, function (error, response, body) {
    var data = {}
    if (!error && response.statusCode === 200) {
      var reqData = JSON.parse(body)
      data.openid = reqData.openid
      data.result = {
        code: 200,
        msg: '授权成功'
      }
    } else {
      data.result = {
        code: -1,
        msg: '授权失败'
      }
    }
    responseJSON(res, data)
  })
});

router.post('/login', function (req, res) {
  pool.getConnection(function (err, connection) {
    var param = req.body
    var nickname = param.nickname
    var openid = param.openid
    var _res = res
    var syscusid = ''
    var myCusid = ''
    connection.query(customerSql.queryAll, function (err, res) {
      var data = {}
      var isAdmin = false
      var isHaveOrder = false
      if (res) {
        var isHave = false
        for (let i = 0; i < res.length; i++) {
          if (res[i].OPENID == openid) {
            isHave = true
            syscusid = res[i].CUSID
            myCusid = res[i].CUSID
          }
        }
        if (!isHave) {
          var cusid = uuid.v4()
          myCusid = cusid
          connection.query(customerSql.insert, [cusid, openid, nickname], function (err, result) {
            if (result) {
              data.result = {
                code: 200,
                msg: '成功注册',
                isAdmin: isAdmin
              }
            } else {
              data.result = {
                code: -1,
                msg: '数据库注册失败'
              }
            }
          })
        } else {
          connection.query(orderSql.selectCusOrder + `'${myCusid}'`, function (err, res) {
            if (res) {
              if (res.length > 0) {
                isHaveOrder = true
              }
            }
          })
          connection.query(syscusSql.queryAll, function (err, res) {
            if (res) {
              for (let i = 0; i < res.length; i++) {
                if (res[i].CUSID == syscusid) {
                  isAdmin = true
                  limit = res[i].LIMITS
                }
              }
            }
          })
          setTimeout(() => {
            data.result = {
              code: 200,
              msg: '已注冊',
              isAdmin: isAdmin,
              cusid: myCusid,
              isHaveOrder: isHaveOrder,
              limit: limit
            }
          }, 300)
        }
      }
      if (err) {
        data.err = err
      }
      // 以JSON格式返回操作结果给前台
      setTimeout(() => {
        responseJSON(_res, data)
      }, 300)
      connection.release()
    })
  })
})

module.exports = router;