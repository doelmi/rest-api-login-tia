var express = require('express')
var router = express.Router()
var Client = require('../models/Client')
var User = require('../models/User')

router.post('/log', function(req, res, next) {
  Client.insertLogData(req.body.username, req.body.no_pc, function(err, result) {
    if (err) {
      res.json(err)
    } else {
      res.json(result)
    }
  })
});

router.put('/status/:username', function(req, res, next) {
  Client.updateStatusLogin(req.body.status_login, req.params.username, function(err, result) {
    if (err) {
      res.json(err)
    } else {
      if (result.affectedRows != 0) {
        res.json(result)
      } else {
        res.status(404)
        res.json({
          message: "Tidak Ditemukan",
          code: 404
        })
      }
    }
  })
});

router.post('/login', function(req, res, next) {
  Client.login(req.body.username, req.body.password, function(err, result) {
    if (err) {
      res.status(401)
      res.json(err)
    } else {
      if (result.length > 0) {
        res.json(result[0])
      } else {
        res.status(404)
        res.json({
          message: "Tidak Ditemukan",
          code: 404
        })
      }
    }
  })
});

router.get('/keterangan/:ket', function(req, res, next) {
  Client.getKeterangan(req.params.ket, function(err, rows) {
    if (err) {
      res.json(err)
    } else {
      if (rows.length > 0) {
        res.json(rows[0].keterangan)
      } else {
        res.status(404)
        res.json({
          message: "Tidak Ditemukan",
          code: 404
        })
      }
    }
  })
});

router.post('/register', function(req, res, next) {
  User.insert(req.body, function(err, result) {
    if (err) {
      res.status(401)
      res.json(err)
    } else {
      res.json(result)
    }
  })
});

router.get('/nonim/:nim', function(req, res, next) {
  User.selectByNIM(req.params.nim, function(err, rows) {
    if (err) {
      res.status(401)
      res.json(err)
    } else {
      if (rows.length == 0) {
        res.json(true)
      } else {
        res.json(false)
      }
    }
  })
})

router.get('/nouname/:id', function(req, res, next) {
  User.selectByID(req.params.id, function(err, rows) {
    if (err) {
      res.status(401)
      res.json(err)
    } else {
      if (rows.length == 0) {
        res.json(true)
      } else {
        res.json(false)
      }
    }
  })
})

router.get('/cekstatus/:id', function(req, res, next) {
  Client.cekStatusLogin(req.params.id, function(err, rows) {
    if (err) {
      res.status(401)
      res.json(err)
    } else {
      if (rows.length > 0) {
        res.json(rows[0].status_login == 1 ? false : true)
      } else {
        res.status(404)
        res.json(false)
      }
    }
  })
})

module.exports = router
