var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var syscusSql = require('../db/syscusSql')
var menuSql=require("../db/menuSql")
var dbConfig = require('../db/dbConfig')

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

/* GET home page. */

router.get('/', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var data = {}
        connection.query(syscusSql.queryAll, function (err, e) {
            if (e) {
                data.res = e
            }
            //   发送数据
            responseJSON(res, data)
        })
        //   断开数据库
        connection.release()
    })
});
router.get('/add', function (req, res, next) {
    var params = req.query || req.params
    var limit='false';
    var addSqlParams =[JSON.parse(params.admin).cusid,JSON.parse(params.admin).name,limit]
    console.error(JSON.parse(params.admin));
    pool.getConnection(function (err, connection) {
        var data = {}
        connection.query(syscusSql.insert,addSqlParams,function (err, e) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                return;
            }
        })
        connection.query(syscusSql.queryAll, function (err, e) {
            if (e) {
                data.res = e
            }
            //   发送数据
            responseJSON(res, data)
        })
        //   断开数据库
        connection.release()
    })
});
router.get('/subtract', function (req, res, next) {
    var params = req.query || req.params
    var cusid = params.cusid
    pool.getConnection(function (err, connection) {
        var data = {}

        connection.query(`DELETE FROM syscus where CUSID='${cusid}'`, function (err, e) {
            if (err) {
                console.log('[DELETE ERROR] - ', err.message);
                return;
            }
        });
        var data = {}
        connection.query(syscusSql.queryAll, function (err, e) {
            if (e) {
                data.res = e
            }
            //   发送数据
            responseJSON(res, data)
        })
        //   断开数据库
        connection.release()
    })
});

router.get('/foodlist', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        var data = []
        connection.query(menuSql.queryGoodsTypeAll, function (err, e) {
            if (e) {
                // console.log(e)
            }
            //   发送数据
            responseJSON(res, data)
        })
        //   断开数据库
        connection.release()
    })
});
module.exports = router;