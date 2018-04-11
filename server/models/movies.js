const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: {type: String, required: true},
  poster: String,
  rating: String,
  introduction: String,
  created_at: { type: Date, default: Date.now},
  updated_at: { type: Date, default: Date.now}
})

module.exports = mongoose.model('Movies', movieSchema)