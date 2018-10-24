var express = require('express')
var router = express.Router()
var Log = require('../models/Log')

router.get('/:id?', function(req, res, next) {
  // res.send('respond with a resource');
  if (req.params.id) {
    Log.selectById(req.params.id, function(err, rows) {
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
    Log.select(function(err, rows) {
      if (err) {
        res.json(err)
      } else {
        let data = []
        let page = []
        let counter = 1
        for (let value of rows) {
          page.push(value)
          if (counter % 100 == 0) {
            data.push(page)
            page = []
          }else if (counter == rows.length) {
            data.push(page)
          }
          counter++
        }
        res.json(data)
        // res.json(rows)
      }
    })
  }
});

router.post('/', function(req, res, next) {
  Log.insert(req.body, function(err, count) {
    if (err) {
      res.json(err)
    } else {
      res.json(req.body)
    }
  })
})

router.delete('/:id', function(req, res, next) {
  Log.setDelete(req.params.id, function(err, count) {
    if (err) {
      res.json(err)
    } else {
      res.json(count)
    }
  })
})

router.get('/whousepc/:pc', function(req, res, next) {
  Log.getLastUserUsePC(req.params.pc, function(err, rows) {
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
});

router.get('/pcusedby/:username', function(req, res, next) {
  Log.getUserUseLastPC(req.params.username, function(err, rows) {
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
});

module.exports = router
