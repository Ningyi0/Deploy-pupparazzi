const express = require('express')
const hbs = require('express-handlebars')

const fs = require('fs').promises

const server = express()



// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here

// Router for /puppies
const pupRouter = require('./routes')
server.use('/puppies', pupRouter)


server.get('/', (req, res) => {
  fs.readFile('data.json', 'utf-8')
    .then((puppsData) => {
      const data = JSON.parse(puppsData)

      const viewData = {
        puppiesList: data.puppies
      }
      res.render('home', viewData)
    })

})



module.exports = server
