var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = require('./../models/movies');

mongoose.connect('mongodb://127.0.0.1:27017/movie');

router.get('/',function(req, res, next) {
  Movie.find({}, (err,doc)=>{
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})

module.exports = router