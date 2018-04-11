var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./../models/users');

/* GET users listing. */
router.get('/list', function(req, res, next) {
  User.find({},  (err, doc) => {
    if (err) {
      res.json({
        status: '1',
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

// 登录
router.post('/login', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin','*')
  var param = {
      userName: req.body.username,
      userPwd: req.body.password
  }
  User.findOne(param, function(err, doc) {
      if (err) {
          res.json({
              code: "1",
              msg: err.message
          })
      } else {
          if (doc) {
              res.cookie("userId", doc.userId, {
                  path: "/",
                  maxAge: 1000 * 60 * 60
              });
              res.json({
                  code: 20000,
                  msg: "",
                  data: {
                      token: doc.role
                  }
              })
          } else {
              res.json({
                  code: "1",
                  msg: "",
                  result: ""
              })
          }
      }
  })
});

// 拉取用户信息
router.get('/info', function (req, res, next) {
  
  var role = req.param('token'),
  // var role = 'admin',
      userId = req.cookies.userId;
      // userId = 'admin';

  User.findOne({userId: userId , role: role}, (err,doc) => {
    if (err) {
      res.json({
        code: '1',
        msg: err.message
      })
    } else {
      res.json({
        code: 20000,
        data: {
          roles: [doc.role],
          role: [doc.role],
          name: doc.userName,
          userid: doc.userId,
          avatar: doc.avatar
        }
      })
    }
  })
})

// 登出功能
router.post('/logout', function(req, res, next) {
  res.cookie("userId", "", {
      path: "/",
      maxAge: -1
  });
  res.json({
      code: 20000,
      msg: "",
      data: "success"
  })
});

router.post('/add', function(req, res, next) {
  var userObj = req.body.userinfo;
  var user = new User({
    userId: '2018'+(new Date()).valueOf(),
    userName: userObj.name,
    userPwd: userObj.pwd,
    role: userObj.role,
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    created_at: Date(),
    updated_at: Date()
  })
  user.save(function(err, doc) {
    if (err) {
        res.json({
            code: 1,
            msg: err.message
        })
    } else {
        res.json({
            code: 20000,
            msg: '',
            data: 'suc'
        })
    }
  })
})

router.post('/delete', function (req, res, next) {
  var userId = req.body.userId
  User.remove({
    userId: userId
  }, function (err) {
    if (err) {
      res.json({
        code: 1,
        msg: err.message
      })
    } else {
      res.json({
        code: 20000,
        msg: '',
        data: 'suc'
      })
    }
  })
})

router.post('/edit', function (req, res, next) {
  var userId = req.body.userId;
  var userName = req.body.userinfo.name,
      role = req.body.userinfo.role;
  User.update({
    userId:userId
  }, {
    $set: {userName: userName, role: role, updated_at: Date()}
  }, function (err) {
    if (err) {
      res.json({
        code: 1,
        msg: err.message
      })
    } else {
      res.json({
        code: 20000,
        msg: '',
        data: 'suc'
      })
    }
  })
})

module.exports = router;
