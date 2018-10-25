var Database = require('../dbconnection')

class Login extends Database {
  constructor() {
    super()
    this.tableName = "setting"
  }

  checkLogin(callback) {
    return this.db.query(`SELECT * FROM ${this.tableName} WHERE kunci = 'token' OR kunci = 'username' OR kunci = 'password'`, callback)
  }
  checkToken(token, callback) {
    return this.db.query(`SELECT * FROM ${this.tableName} WHERE kunci = 'token' AND keterangan = ?`, [token], callback)
  }
}

module.exports = new Login()
