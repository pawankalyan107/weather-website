const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//Define path for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partials = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partials)

//Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Pawan Kalyan'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Pawan Kalyan'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    name: 'Pawan Kalyan',
    paragraph: 'Hello there, How can we help you!!'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'you must provide the address'
    })
  } else {
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error })
      } else {
        forecast(latitude, longitude, (error, forecastData, celsiusData) => {
          if (error) {
            return res.send({ error })
          }
          res.send({
            celsius: celsiusData,
            forecast: forecastData,
            location,
            address: req.query.address
          })
        })
      }
    })
  }
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'you must provide a search term'
    })
  }
  return res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404Page', {
    title: 'HELP',
    message: 'Help article not found',
    name: 'PK'
  })
})

app.get('*', (req, res) => {
  res.render('404Page', {
    title: '404',
    name: 'PK',
    message: '404 not found'
  })
})

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
