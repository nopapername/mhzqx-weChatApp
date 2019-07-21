var express = require('express');
var router = express.Router();
var mysql = require('mysql')
var dbConfig = require('../db/dbConfig')
var uuid = require('node-uuid')
var menuSql = require('../db/menuSql')

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

router.get('/', function (req, res) {
  pool.getConnection(function (err, connection) {
    var gtList = []
    var _res = res
    var data = {}
    connection.query(menuSql.queryGoodsTypeAll, function(err, resp) {
      if (resp) {
        resp.forEach(element => {
          var menuNav = {
            gt: {},
            goodslist: []
          }
          menuNav.gt.gtid = element.GTID
          menuNav.gt.gtname = element.GTNAME
          menuNav.gt.gtstate = element.GTSTATE
          
          gtList.push(menuNav)
        })
        connection.query(menuSql.queryGoodsAll, function (err, respon) {
          if (respon) {
            respon.forEach(element => {
              for (let i = 0; i < gtList.length; i++) {
                if (gtList[i].gt.gtid == element.GTID) {
                  var goods = {}
                  goods.gid = element.GID
                  goods.gtid = element.GTID
                  goods.gname = element.GNAME
                  goods.gprice = element.GPRICE
                  goods.gstate = element.GSTATE
                  goods.gcontent = element.GCONTENT
                  goods.gimg = element.GIMG
                  goods.gtime = element.GTIME
                  goods.gcount = element.GCOUNT

                  gtList[i].goodslist.push(goods)
                }
              }
            })
            data.gtlist = gtList
            responseJSON(_res, data)
            connection.release()
          }
        })
      }
    })
  })
})

module.exports = router;