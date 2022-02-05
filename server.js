const express = require('express')
const hbs = require('express-handlebars')
const fs = require('fs/promises')
const routes = require('./routes')

const server = express()

// Server configuration
server.use(express.static('public'))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs({ extname: 'hbs' }))
server.set('view engine', 'hbs')

// Your routes/router(s) should go here
// server.get('/', (req, res) => {
//     res.send('Pupparazzi')  //send is a function on res and it's going to send back a string.
// })

//USER STORY 1
server.get('/', (req, res) => {
  fs.readFile('data.json')
  .then(data => {
   return JSON.parse(data)
   //parses the JSON string and turns it into a JS object
  })
  .then(parsedData => {
    return res.render('home', parsedData)
    //render 'home' view, with parsedData (from line 24)
  })
  .catch(err => {
      console.error('Check file name or path maybe? ', err.path)
  })  
})

server.use(routes)

module.exports = server
