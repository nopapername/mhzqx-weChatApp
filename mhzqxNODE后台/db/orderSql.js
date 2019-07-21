var orderSql = {
  insertCusOrder: 'INSERT INTO cusorders(ORDERID, CUSID, ORDERTIME, ORDERSTATE, ORDERTOTLEPRICE) VALUES(?, ?, ?, ?, ?)',
  insertOrderDetail: 'INSERT INTO orderdetail(GID, ORDERID, GNAME, GCOUNT, GPRICE, GTIME) VALUES(?, ?, ?, ?, ?, ?)',
  insertOverOrder: 'INSERT INTO overorder(ORDERID, CUSID, ORDERTIME, ORDERSTATE, ORDERTOTLEPRICE) VALUES(?, ?, ?, ?, ?)',
  queryAllCusOrder: 'SELECT * FROM cusorders',
  queryAllOrderDetail: 'SELECT * FROM orderdetail',
  queryAllOverOrder: 'SELECT * FROM overorder',
  selectCusOrder: 'SELECT * FROM cusorders WHERE CUSID=',
  selectCusOrderOrderId: 'SELECT * FROM cusorders WHERE ORDERID=',
  selectOrderDetail: 'SELECT * FROM orderdetail WHERE ORDERID=',
  deleteCusOrder: 'DELETE FROM cusorders WHERE ORDERID='
}

module.exports = orderSql