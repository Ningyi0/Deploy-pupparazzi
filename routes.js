const express = require('express')
const fs = require('fs/promises')
const router = express()
//creates a router

module.exports = router

//USER STORY 2
router.get('/puppies/:id', (req, res) => {
    const pupIndex = req.params.id - 1
    //Puppy IDs start at 1 but since our puppies are listed as an array of objects with the first puppy index starting at 0, we subtract 1 in order to access the details of each puppy object in the array.
    // console.log(req.params.id)
    
    fs.readFile('data.json')
    .then(data => {
        return JSON.parse(data)
    })
    .then(parsedData => {
        return res.render('details', parsedData.puppies[pupIndex])
    })
    .catch(err => {
        console.error(err.message)
    })  
  })

//   The req.params property is an object containing properties mapped to the named route “parameters”. For example, if you have the route /student/:id, then the “id” property is available as req.params.id. This object defaults to {}

//USER STORY 3
router.get('/puppies/:id/edit', (req, res) => {
    const pupIndex = req.params.id - 1
    fs.readFile('data.json')
    .then(data => {
        return JSON.parse(data)
    })
    .then(parsedData => {
        return res.render('edit', parsedData.puppies[pupIndex])
    })
    .catch(err => {
        console.error(err.message)
    })  
})

router.post('/puppies/:id/edit', (req, res) => {

//1.Create an object of updated puppy data from the request body
    // req.body = [Object: null prototype]; gives us the updated puppy data but this object is not iterable   
   
    const pup = JSON.parse(JSON.stringify(req.body))
    const index = req.params.id
    console.log(index)
   
   //So we turn it into a JSON string and then back to a JS object using the JSON stringify and parse methods respectively!

//2. Read the JSON file and locate the puppy we are going to update:
    fs.readFile('data.json')
    .then(data => {
     const arrayOfPuppies = JSON.parse(data).puppies
     //gives us the current array of puppies
     
     const filteredPupArray = arrayOfPuppies.filter(item => item.id !== Number(pup.id)) 
    //filter the current array of puppies and return ALL puppy objects where the id does not match dog id

//3. Update the puppy in the array
    const updatedpupInfo = {
        id: Number(pup.id),
        name: pup.name,
        breed: pup.breed,
        owner: pup.owner,
        image: pup.image,
    }
    console.log(updatedpupInfo)
    const updatedPupArray = [...filteredPupArray, updatedpupInfo].sort((a, b) => (a.id > b.id ? 1 : -1))
    //The sort() method accepts a comparator function. This function accepts two arguments (both presumably of the same type) and it's job is to determine which of the two comes first.
    return updatedPupArray
    })
//4. Write the entire array back into the JSON file
    .then(updatedInfo => {
    const newArray = { puppies: [...updatedInfo]}
    console.log(newArray)
    return fs.writeFile('data.json', JSON.stringify(newArray), 'utf-8')
    })
//5. Redirect to the GET /puppies/:id route
    .then(() => {
     return res.redirect(`/puppies/${index}`)
   })
   .catch(err => {
    console.log(err)
  })
})