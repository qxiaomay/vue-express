var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Table = require('./../models/table');

/* GET home page. */
router.get('/list', function(req, res, next) {
  Table.find({}, (err, doc) => {
    if (err) {
      res.json({
        code: 1,
        msg: err.message
      })
    } else {
      res.json({
        code: 20000,
        msg: '',
        data: {
          count: doc.length,
          items: doc
        }
      })
    }
  })
});

module.exports = router;
