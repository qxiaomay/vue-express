const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  id: String,
  title: String,
  status: String,
  author: String,
  display_time: String,
  pageviews: Number
})

module.exports = mongoose.model('Table', tableSchema)