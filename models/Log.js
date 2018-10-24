var Database = require('../dbconnection')

class Log extends Database {
  constructor() {
    super()
    this.tableName = "log"
    this.id = "id_log"
  }
  select(callback) {
    return this.db.query(`SELECT * FROM ${this.tableName} ORDER BY ${this.id} DESC`, callback)
  }
  selectById(id, callback) {
    return this.db.query(`SELECT * FROM ${this.tableName} WHERE ${this.id} = ?`, [id], callback)
  }
  insert(Log, callback) {
    return this.db.query(`INSERT INTO ${this.tableName} VALUES(null, ?, ?, null)`, [Log.username, Log.pc], callback)
  }
  delete(id, callback) {
    return this.db.query(`DELETE FROM ${this.tableName} WHERE ${this.id} = ?`, [id], callback)
  }
  getLastUserUsePC(pc, callback){
    return this.db.query(`SELECT username, waktu FROM ${this.tableName} WHERE no_pc = ? ORDER BY ${this.id} DESC LIMIT 1`, [pc], callback)
  }
  getUserUseLastPC(username, callback){
    return this.db.query(`SELECT no_pc, waktu FROM ${this.tableName} WHERE username = ? ORDER BY ${this.id} DESC LIMIT 1`, [username], callback)
  }
}

module.exports = new Log()
