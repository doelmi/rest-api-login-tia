var Login = require('../models/Login')

class Auth {
  constructor() {

  }
  login(req, res, next) {
    Login.checkToken(req.query.token, function(err, result) {
      if (err) throw err
      if (result.length > 0) {
        next()
      } else {
        let error = {
          message: "Harus Login!",
          code: 401
        }
        res.status(401)
        res.json({
          error: error
        })
      }
    })
  }
}
module.exports = new Auth();
