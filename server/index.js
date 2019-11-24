const { Nuxt, Builder } = require('nuxt')

const app = require('express')()
const isProd = (process.env.NODE_ENV === 'production')
const port = process.env.PORT || 3000

const server = require('http').createServer(app)

const consola = require('consola')

const config = require('../nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/raccoon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})

const jwt = require('express-jwt')
app.use(
  jwt({
    secret: 'dummy',
    credentialsRequired: false
  }).unless({
    path: [
      '/auth/login',
    ]
  })
)

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const methodOverride = require('method-override')
app.use(methodOverride())

const auth = require('./routes/auth')
const flower = require('./routes/flower')
app.use('/api', auth)
app.use('/api', flower)

app.use(nuxt.render)

app.use(function(err, req, res, next) {
  console.log(err)
});

if (config.dev) {
  new Builder(nuxt).build().then(listen)
}
else {
  listen()
}

function listen() {
  server.listen(port, '0.0.0.0')
  consola.success('Server listening on `localhost:' + port + '`.')
}
