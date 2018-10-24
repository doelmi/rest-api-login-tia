var Database = require('../dbconnection')

class User extends Database {
  constructor() {
    super()
    this.tableName = "user"
    this.id = "username"
  }
  select(callback) {
    return this.db.query(`SELECT * FROM ${this.tableName} WHERE dihapus = 0 ORDER BY dibuat_pada DESC`, callback)
  }
  selectById(id, callback) {
    return this.db.query(`SELECT * FROM ${this.tableName} WHERE ${this.id} = ?`, [id], callback)
  }
  insert(User, callback) {
    return this.db.query(`INSERT INTO ${this.tableName} VALUES(?, ?, ?, ?, 0, CURRENT_TIMESTAMP, 0, 0)`, [User.username, User.password, User.name, User.nim], callback)
  }
  delete(id, callback) {
    return this.db.query(`DELETE FROM ${this.tableName} WHERE ${this.id} = ?`, [id], callback)
  }
  // update(id, User, callback){
  //   return this.db.query(`UPDATE ${this.tableName} SET password = ?, `,,callback)
  // }
  setActive(id, value, callback) {
    return this.db.query(`UPDATE ${this.tableName} SET aktif = ?  WHERE ${this.id} = ?`, [value, id], callback)
  }
  setStatusLogin(id, value, callback) {
    return this.db.query(`UPDATE ${this.tableName} SET status_login = ?  WHERE ${this.id} = ?`, [value, id], callback)
  }
  setDelete(id, callback) {
    return this.db.query(`UPDATE ${this.tableName} SET dihapus = 1  WHERE ${this.id} = ?`, [id], callback)
  }

  search(query, callback){
    return this.db.query(`SELECT * FROM ${this.tableName} WHERE dihapus = 0 AND (${this.id} LIKE '%${query}%' OR nama LIKE '%${query}%' OR NIM LIKE '%${query}%') ORDER BY dibuat_pada DESC`, callback)
  }

  selectByAktif(value, callback){
    let sql = value == 1 ? `SELECT * FROM ${this.tableName} WHERE aktif = 1 AND dihapus = 0 ORDER BY dibuat_pada DESC` : `SELECT * FROM ${this.tableName} WHERE aktif != 1 AND dihapus = 0 ORDER BY dibuat_pada DESC`
    return this.db.query(sql, callback)
  }

  selectByStatusLogin(value, callback){
    let sql = value == 1 ? `SELECT * FROM ${this.tableName} WHERE status_login = 1 ORDER BY dibuat_pada DESC` : `SELECT * FROM ${this.tableName} WHERE status_login != 1 AND dihapus = 0 ORDER BY dibuat_pada DESC`
    return this.db.query(sql, callback)
  }

  selectByNIM(nim, callback) {
    return this.db.query(`SELECT * FROM ${this.tableName} WHERE NIM = ? LIMIT 1`, [nim], callback)
  }

  selectByID(id, callback){
    return this.db.query(`SELECT * FROM ${this.tableName} WHERE ${this.id} = ? LIMIT 1`, [id], callback)
  }

}

module.exports = new User()
