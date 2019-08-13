const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

const port = process.env.PORT || 3000

// Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebar engine and views loaction
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Alan Jhu'
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Alan Jhu'
  })
})
app.get('/help', (req, res) => {
  res.render('help', {
    message: 'If you need any help, contact me at alan61109@163.com.',
    title: 'Help',
    name: 'Alan Jhu'
  })
})

app.get('/weather', (req, res) => {
  const { address } = req.query
  if (!address) {
    return res.send({
      error: 'You must provide an address'
    })
  }
  
  // *** 這裡的對象解構，是要防止error發生的同時，data是undefiend，undefiend解構會報錯 ***
  geocode(address, (error, {lontitude, latitude, location} = {}) => {

    // 如果上面沒有對象解構，即便這裡處理error一樣會報錯
    if (error) {
      return res.send({
        error
      })
    }
  
    forecast({lontitude, latitude }, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        })
      }
      res.send({
        location,
        address,
        forecast: forecastData,
      })
    })
  })
})

app.get('/product', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Alan Jhu',
    errorMsg: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Alan Jhu',
    errorMsg: '404 Not Found'
  })
})

app.listen(port, () => {
  console.log('server listening on port ' + port)
})