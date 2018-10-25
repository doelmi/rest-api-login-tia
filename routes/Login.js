var express = require('express')
var router = express.Router()
var Login = require('../models/Login').child

router.post('/cek', function(req, res, next) {
  Login.checkLogin(function(err, rows) {
    if (err) {
      res.json(err)
    } else {
      if (rows.length > 0) {
        let newData = {}
        for (var i = 0; i < rows.length; i++) {
          newData[rows[i].kunci] = rows[i].keterangan
        }
        if (newData.username == req.body.username && newData.password == req.body.password) {
          res.json({
            token: newData.token
          })
        } else {
          let error = {
            message: "Login gagal!",
            code: 400
          }
          res.status(400)
          res.json({
            error: error
          })
        }
      } else {
        let error = {
          message: "Data Not Found",
          code: 404
        }
        res.status(404)
        res.json({
          error: error
        })
      }
    }
  })
});

router.get('/cektoken/:token', function(req, res, next) {
  Login.checkToken(req.params.token,function(err, rows) {
    if (err) {
      res.json(err)
    } else {
      if (rows.length > 0) {
        res.json(true)
      } else {
        let error = {
          message: "Data Not Found",
          code: 404
        }
        res.status(404)
        res.json({
          error: error
        })
      }
    }
  })
});


module.exports = router
