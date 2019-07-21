var syscusSql = {
  insert: 'INSERT INTO syscus(CUSID, NICKNAME, LIMITS) VALUES(?, ?, ?)',
  queryAll: 'SELECT * FROM syscus'
}
module.exports = syscusSql