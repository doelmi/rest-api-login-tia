var express = require('express')
var router = express.Router()
var User = require('../models/User')
var Auth = require('../Middleware/Auth')
var Login = require('../models/Login')

/* GET users listing. */
router.get('/:id?', function(req, res, next) {
  if (req.params.id) {
    User.selectById(req.params.id, function(err, rows) {
      if (err) {
        res.json(err)
      } else {
        if (rows.length > 0) {
          res.json(rows[0])
        } else {
          let error = {
            message: "Not Found",
            code: 404
          }
          res.status(404)
          res.json({
            error: error
          })
        }
      }
    })
  } else {
    User.select(function(err, rows) {
      if (err) {
        res.json(err)
      } else {
        let data = []
        let page = []
        let counter = 1
        for (let value of rows) {
          page.push(value)
          if (counter % 99 == 0) {
            data.push(page)
            page = []
          } else if (counter == rows.length) {
            data.push(page)
          }
          counter++
        }
        res.json(data)
        //res.json(rows)
      }
    })
  }
});

router.post('/', function(req, res, next) {
  User.insert(req.body, function(err, count) {
    if (err) {
      res.json(err)
    } else {
      res.json(req.body)
    }
  })
})

router.delete('/:id', function(req, res, next) {
  User.setDelete(req.params.id, function(err, count) {
    if (err) {
      res.json(err)
    } else {
      res.json(count)
    }
  })
})

router.put('/aktif/:id', function(req, res, next) {
  User.setActive(req.params.id, req.body.value, function(err, rows) {
    if (err) {
      res.json(err)
    } else {
      res.json(rows)
    }
  })
})

router.put('/login/:id', function(req, res, next) {
  User.setStatusLogin(req.params.id, req.body.value, function(err, rows) {
    if (err) {
      res.json(err)
    } else {
      res.json(rows)
    }
  })
})

router.get('/cari/:query', function(req, res, next) {
  User.search(req.params.query, function(err, rows) {
    if (err) {
      res.json(err)
    } else {
      let data = []
      let page = []
      let counter = 1
      for (let value of rows) {
        page.push(value)
        if (counter % 99 == 0) {
          data.push(page)
          page = []
        } else if (counter == rows.length) {
          data.push(page)
        }
        counter++
      }
      res.json(data)
      //res.json(rows)
    }
  })
})

router.get('/aktif/:value', function(req, res, next) {
  User.selectByAktif(req.params.value, function(err, rows) {
    if (err) {
      res.json(err)
    } else {
      let data = []
      let page = []
      let counter = 1
      for (let value of rows) {
        page.push(value)
        if (counter % 99 == 0) {
          data.push(page)
          page = []
        } else if (counter == rows.length) {
          data.push(page)
        }
        counter++
      }
      res.json(data)
      //res.json(rows)
    }
  })
})

router.get('/login/:value', function(req, res, next) {
  User.selectByStatusLogin(req.params.value, function(err, rows) {
    if (err) {
      res.json(err)
    } else {
      let data = []
      let page = []
      let counter = 1
      for (let value of rows) {
        page.push(value)
        if (counter % 99 == 0) {
          data.push(page)
          page = []
        } else if (counter == rows.length) {
          data.push(page)
        }
        counter++
      }
      res.json(data)
      //res.json(rows)
    }
  })
})

router.get('/nonim/:nim', function(req, res, next) {
  User.selectByNIM(req.params.nim, function(err, rows) {
    if (err) {
      res.json(err)
    } else {
      if (rows.length == 0) {
        res.json({
          nonim: true
        })
      } else {
        res.json({
          nonim: false
        })
      }
    }
  })
})

router.get('/nouname/:id', function(req, res, next) {
  User.selectByID(req.params.id, function(err, rows) {
    if (err) {
      res.json(err)
    } else {
      if (rows.length == 0) {
        res.json({
          nouname: true
        })
      } else {
        res.json({
          nouname: false
        })
      }
    }
  })
})

module.exports = router
