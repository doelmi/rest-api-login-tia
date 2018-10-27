var Database = require('../dbconnection')

class Client extends Database {
  constructor() {
    super()
  }

  insertLogData(username, no_pc, callback) {
    return this.db.query(`INSERT INTO log(username, no_pc) VALUES(?, ?)`, [username, no_pc], callback)
  }
  updateStatusLogin(status_login, username, callback) {
    return this.db.query(`UPDATE user SET status_login = ? WHERE username = ?`, [status_login, username], callback)
  }
  login(username, password, callback) {
    return this.db.query(`SELECT * FROM user WHERE username = ? AND password = ? AND dihapus = 0 LIMIT 1`, [username, password], callback)
  }
  getKeterangan(status, callback){
    return this.db.query(`SELECT keterangan FROM status_user WHERE id = ? LIMIT 1`, [status], callback)
  }
  cekStatusLogin(username, callback){
    return this.db.query(`SELECT status_login FROM user WHERE username = ? AND dihapus = 0 LIMIT 1`, [username, password], callback)
  }
}

module.exports = new Client()
