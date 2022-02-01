const express = require('express')
const router = express.Router()
const server = express()
module.exports = router
const path = require('path')

// Accecpt url encoded data
server.use(express.urlencoded({ extended: false }))

const filepath = path.join(__dirname, 'data.json')

const fsPromises = require('fs').promises

router.get('/', (req, res) => {
  fsPromises.readFile(filepath, 'utf-8')
    .then((data) => {
      const result = JSON.parse(data)
      //   console.log(puppyData)
      //   const viewData = {
      //     puppyData: puppyView.puppies
      //     // puppyImage: puppyView.image
      //   }
      //   console.log(viewData)
      res.render('home', result)
      return null
    })
    .catch(err => {
      console.error(('ooopsy Daisy', err))
    })
})

// params, :ID

router.get('/puppies/:id', (req, res) => {
  fsPromises.readFile(filepath, 'utf-8')
    .then((details) => {
      const result = JSON.parse(details)
      //   console.log(result)
      //   console.log(result.puppies[1])

      res.render('details', result.puppies.find(puppy => puppy.id === Number(req.params.id)))

      // below is buggy - use line above instead
      // res.render('details', result.puppies[req.params.id - 1])

      return null
    })

    .catch(err => {
      console.error(('ooopsy Daisy', err))
    })
})

// update puppy

router.get('/puppies/:id/edit', (req, res) => {
  // console.log('param', req.params.id)

  const id = Number(req.params.id)

  fsPromises.readFile(filepath, 'utf-8')
    .then((data) => {
      const result = JSON.parse(data)

      res.render('edit', result.puppies.find(puppy => puppy.id === Number(req.params.id)))
      return null
    })
    .catch(err => {
      console.error(('ooopsy Daisy', err))
    })
})

// POST route
router.post('/puppies/:id/edit', (req, res) => {
  const id = Number(req.params.id)

  const newData = {
    id: id,
    name: req.body.name,
    owner: req.body.owner,
    image: req.body.image,
    breed: req.body.breed
  }
  fsPromises.readFile(filepath, 'utf-8')
    .then((data) => {
      const result = JSON.parse(data)

      const updatePup = result.puppies.map(pup => {
        if (pup.id === id) {
          pup = newData
        }
        return pup
      })

      result.puppies = updatePup
      const newPup = JSON.stringify(result)

      // .then MUST return the next promise if there's multiple (inside the .then '})' )

      return fsPromises.writeFile('./data.json', newPup, 'utf-8')
    })

    .then(() => {
      return res.redirect(`/puppies/${id}`)
    })

    .catch(err => {
      console.error(err.message)
    })
})
