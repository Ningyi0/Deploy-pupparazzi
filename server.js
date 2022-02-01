const express = require('express')
const hbs = require('express-handlebars')
// added
const fs = require('fs').promises

const server = express()

// Meke Router "/puppies " 
const pupRouter = require('./routes')
server.use('/puppies', pupRouter)

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
server.get('/', (req, res) => {
  fs.readFile('data.json', 'utf-8')
    .then((puppsData) => {
      const data = JSON.parse(puppsData)

      const viewData = {
        puppies: data.puppies
      }
      // handlebars setting
      const template = 'home'
      res.render(template, viewData)
    })
    .catch(err => {
      console.err('Opps something happend')
    })
})


module.exports = server
