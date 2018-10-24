var mysql = require('mysql')

class Database {
  constructor() {
    this.db = mysql.createPool({
      host: '10.5.12.10',
      user: 'doelmi',
      password: 'doelmi',
      database: 'db_login_tia'
    })
  }
}

module.exports = Database
