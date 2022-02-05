const express = require('express')
const router = express()
const fs = require('fs/promises')

// to show the stupid puppies individually when clicked //

router.get('/puppies/:id', (req, res) => {
  const pupInfo = parseInt(req.params.id) - 1

  fs.readFile('data.json')
    .then((data) => {
      return JSON.parse(data)
    })
    .then((result) => {
      return res.render('details', result.puppies[pupInfo])
    })
    .catch((err) => {
      console.log(err)
    })
})

// edit dumb puppy and add information
// create route to retrieve puppy information
//

router.get('/puppies/:id/edit', (req, res) => {
  const pupInfo = parseInt(req.params.id) - 1
  console.log(pupInfo)
  fs.readFile('data.json')
    .then((data) => {
      return JSON.parse(data)
    })
    .then((result) => {
      return res.render('edit', result.puppies[pupInfo])
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/puppies/:id/edit', (req, res) => {
  const id = req.params.id

  const editDumbPup = {
    id: id,
    name: req.body.name,
    owner: req.body.owner,
    image: req.body.image,
    breed: req.body.breed
  }

  fs.readFile('data.json', (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    const parsedData = JSON.parse(data)
    const updatedData = parsedData.puppies.map((p) => {
      if (p.id === id) {
        console.log(p)
        p = editDumbPup
      }
    })
    console.log(updatedData)
  })
})

module.exports = router
