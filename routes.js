const express = require('express')
const router = express.Router()
const fs = require('fs/promises')

router.get('/:id', (req, res) => {
  // console.log('this is the unpassed number', req.params.id, typeof (req.params.id));
  const index = parseInt(req.params.id) - 1
  // console.log('this is the passed number', index, typeof (index));
  fs.readFile('data.json')
    .then(data => {
      return JSON.parse(data)
    })
    .then(parsedpuppyData => {
      const foundPuppy = parsedpuppyData.puppies[index]
      console.log(foundPuppy);
      const viewData = {
        image: foundPuppy.image,
        name: foundPuppy.name,
        breed: foundPuppy.breed,
        owner: foundPuppy.owner,
        id: foundPuppy.id
      }
      return res.render('details', viewData)
    })
    .catch(err => {
      console.log(err)
    })

})

router.get('/:id/edit', (req, res) => {
  const index = parseInt(req.params.id) - 1
  fs.readFile('data.json')
    .then(data => {
      return JSON.parse(data)
    })
    .then(parsedpuppyData => {
      const foundPuppy = parsedpuppyData.puppies[index]
      console.log(foundPuppy);
      const viewData = {
        image: foundPuppy.image,
        name: foundPuppy.name,
        breed: foundPuppy.breed,
        owner: foundPuppy.owner,
        id: foundPuppy.id
      }
      return res.render('edit', viewData)
    })
    .catch(err => {
      console.log(err)
    })
})

router.post('/:id/edit', (req, res) => {
  const updatedpuppyData = {
    id: req.body.id,
    name: req.body.name,
    owner: req.body.owner,
    image: req.body.image,
    breed: req.body.breed
  }
  const index = parseInt(req.params.id) - 1

  fs.readFile('data.json')
    .then(data => {
      return JSON.parse(data)
    })
    .then(parsedpuppyData => {
      const foundPuppy = parsedpuppyData.puppies[index]
      console.log('this is the found puppy data', foundPuppy);

        foundPuppy.id = req.body.id,
        foundPuppy.name = req.body.name,
        foundPuppy.owner = req.body.owner,
        foundPuppy.image = req.body.image,
        foundPuppy.breed = req.body.breed,
        console.log(parsedpuppyData);

      return JSON.stringify(parsedpuppyData)
    })
    .then(stringifiedPuppyData => {
      fs.writeFile('data.json', stringifiedPuppyData)
      return null
    })
    .catch(err => {
      console.log(err)
    })
  res.redirect(`/puppies/${req.params.id}`)
})

module.exports = router
