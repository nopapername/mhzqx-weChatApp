var menuSql = {
  queryGoodsTypeAll: 'SELECT * FROM goodstype',
  queryGoodsAll: 'SELECT * FROM goods',
  insertGoods: 'INSERT INTO goods(GID, GTID, GNAME, GSTATE, GPRICE, GCONTENT, GIMG, GTIME, GCOUNT, GINFO) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
  insertGoodsType: 'INSERT INTO goodstype(GTID, GTNAME, GTSTATE) VALUES(?, ?, ?)',
}
module.exports = menuSql