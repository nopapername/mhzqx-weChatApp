var customerSql = {
  insert: 'INSERT INTO customer(CUSID, OPENID, NICKNAME) VALUES(?, ?, ?)',
  queryAll: 'SELECT * FROM customer',
  getCustomerByOPENID: 'SELECT * FROM customer WHERE OPENID'
}
module.exports = customerSql