const express = require('express')
const router = express.Router()
const fs = require('fs/promises')

// --------------this is the first route for the different ids in the URL which represents all them idividual puppy pages!!!---------------------------

// this gets the id and reassign it a variable name called index
router.get('/:id', (req, res) => {
  // console.log('this is the unpassed number', req.params.id, typeof (req.params.id));
// because the ids are keys in an array called puppies (data.json) so we have to -1 because array indexes start with 0 not 1
  const index = parseInt(req.params.id) - 1
  // console.log('this is the passed number', index, typeof (index));
  // this converts the id key in the data.json file into a javascript value or object so we can use it here 
  fs.readFile('data.json')
    .then(data => {
      return JSON.parse(data)
    })
  // this is when we give the parsed-id data a name called parsedpuppyData and then give it another name of foundPuppy for each instance a puppy id is called (when clicked to access the corresponding page) 
    .then(parsedpuppyData => {
      const foundPuppy = parsedpuppyData.puppies[index]
      console.log(foundPuppy);
    // this is the stuff that shows up on the corresponding page
      const viewData = {
        image: foundPuppy.image,
        name: foundPuppy.name,
        breed: foundPuppy.breed,
        owner: foundPuppy.owner,
        id: foundPuppy.id
      }
    // 'details' is a file in the views folder
      return res.render('details', viewData)
    })
    .catch(err => {
      console.log(err)
    })

})

// --------------------editing the puppy data on the individual puppy pages!!---------------------------------------------------------------


// this is for accessing the correct page 
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
   // 'edit' is also a file in the vews folder
      return res.render('edit', viewData)
    })
    .catch(err => {
      console.log(err)
    })
})

// this is when we post the content of the edit back into the edit file
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
      console.log("this is the found puppy data", foundPuppy);

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
