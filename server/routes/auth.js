const { Router } = require('express')
const router = Router()
const consola = require('consola')
const delay = require('delay')
const jsonwebtoken = require('jsonwebtoken')

const User = require('../../models/user')

router.post('/auth/login', async (req, res, next) => {
  var phone = req.body.phone

  // consola.success(phone)
  var user = await User.findOne({ phone: phone })
  // consola.success(user)

  if (user) {
    const accessToken = jsonwebtoken.sign(
      {
        phone,
        name: user.name,
        isAdmin: user.isAdmin,
        _id: user._id,
        email: user.email
      },
      'dummy'
    )
    // consola.success(accessToken)
  
    res.json({
      token: {
        accessToken
      }
    })
  }
  else {
    res.status(401).json({ message: 'Bad credentials' })
  }

  


})

router.post('/auth/logout', (req, res, next) => {
  res.sendStatus(200)
})

router.get('/auth/user', (req, res, next) => {
  res.json({ user: req.user })
})

// router.post('/auth/reg', async (req, res, next) => {
//   let user = await new User({
//     name: req.body.name,
//     email: req.body.email,
//     phone: req.body.phone,
//     password: req.body.password,
//     salt: req.body.salt,
//     isAdmin: req.body.isAdmin
//   }).save().catch(function(error) {
//     res.send({ error: error })
//     return next(error)
//   })
//   res.json(user)
// })

module.exports = router
