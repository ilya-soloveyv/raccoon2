const mongoose = require('mongoose')

const FlowerSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  }
})

const Flower = mongoose.model('Flower', FlowerSchema)

module.exports = Flower