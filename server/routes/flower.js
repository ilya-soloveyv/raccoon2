const { Router } = require('express')
const router = Router()
const consola = require('consola')
// const delay = require('delay')
const Flower = require('../../models/flower')

router.post('/flowers', async function (req, res, next) {
  let flowers = await Flower.find()
  res.json(flowers)
})

router.post('/flower/add', async function (req, res, next) {
  var flower = await new Flower({ title: req.body.title }).save().catch(function(error) {
    res.send({ error: error })
    return next(error)
  })
  res.json(flower)
})

router.post('/flower/get', async function (req, res, next) {
  var ObjectId = require('mongoose').Types.ObjectId
  if (!ObjectId.isValid(req.body._id)) {
    res.json({})
  } else {
    let flower = await Flower.findById(req.body._id)
    res.json(flower)
  }
})

router.post('/flower/delete', async function (req, res, next) {
  var result = await Flower.deleteOne({ _id: req.body._id })
  res.json(result)
})

router.post('/flower/update', async function (req, res, next) {
  var result = await Flower.updateOne({
    _id: req.body._id
  }, {
    title: req.body.title
  })
  res.json(result)
})

module.exports = router
