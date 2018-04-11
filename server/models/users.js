const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  userId: String,
  userName: String,
  userPwd: String,
  role: String,
  avatar: String,
  created_at: { type: Date, default: Date.now}, 
  updated_at: { type: Date, default: Date.now}
})

module.exports = mongoose.model('User', usersSchema)