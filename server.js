const express = require('express')
const hbs = require('express-handlebars')
const fsPromises = require('fs').promises

const server = express()
module.exports = server
const pupRoute = require('./routes')

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
server.use('/', pupRoute)

// to show stupid pups on homepage
server.get('/', (req, res) => {
  fsPromises
    .readFile('data.json', 'utf8')
    .then((data) => {
      const viewData = JSON.parse(data)
      res.render('home', viewData)
      return null
    })
    .catch((err) => {
      console.error(err)
    })
})
