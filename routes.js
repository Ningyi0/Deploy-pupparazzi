const express = require('express')
const router = express.Router()
const fs = require('fs').promises

module.exports = router

// Accept URL encoded data on POST request
router.use(express.urlencoded({ extended: false }))

// << Routes for pupiies>> 
router.get('/:id', (req, res) => {
  // console.log('param', req.params.id)
  const id = Number(req.params.id) - 1
  // console.log('id', id)

  fs.readFile('data.json', 'utf-8')
    .then((puppsData) => {

      const data = JSON.parse(puppsData)
      // console.log('xxx', data.puppies[id].id)
      const pupdata = data.puppies.find(item => item.id - 1 === id)
      // console.log('this is pupdata', pupdata)

      // ----- << not good way but still working>> ------
      // const viewData = {
      //   name: data.puppies[id].name,
      //   breed: data.puppies[id].breed,
      //   owner: data.puppies[id].owner,
      //   image: data.puppies[id].image,
      //   id: id + 1
      // }
      // res.render('details', viewData)
      // --------------------------------------------------

      res.render('details', pupdata)
    })

    .catch(err => {
      console.err('Opps something happend')
    })
})

// << Edit pupiies>> 

router.get('/:id/edit', (req, res) => {

  const id = Number(req.params.id) - 1

  fs.readFile('data.json', 'utf-8')
    .then((puppsData) => {

      const data = JSON.parse(puppsData)
      const pupdata = data.puppies.find(item => item.id - 1 === id)

      res.render('edit', pupdata)
    })

    .catch(err => {
      console.err('Opps something happend')
    })
})

// << post route>>
// 1. Create an object of the updated puppy data from the request body
// 2. Read in the JSON file and locate the puppy we are going to update
// 3. Update the puppy in the array
// 4. Write the entire array back into the JSON file
// 5. Redirect to the GET / puppies /: id route

// const data = require('./data.json')

// const puppsData = fs.readFile('data.json', 'utf-8')



// << ':' is dynamic (changeabble) >>
router.post('/:id/edit', (req, res) => {

  // console.log(typeof req.params.id) // string
  const id = Number(req.params.id)
  // console.log(typeof id) // number 

  fs.readFile('data.json', 'utf-8')
    .then((puppsData) => {

      // take all DATA
      const data = JSON.parse(puppsData)
      // const pupdata = data.puppies.find(item => item.id === id)

      // find specific object
      //https://stackoverflow.com/questions/56298481/how-to-fix-object-null-prototype-title-product
      // TO delete [Object: null prototype]
      // const edited = req.body

      const edited = req.body
      edited.id = Number(edited.id)
      // console.log('edited', edited);

      // << filter >>
      const filterdata = data.puppies.filter(obj => obj.id !== id)
      // console.log('filterdata', filterdata);

      //  << changing the order  >>
      // const index =

      //  << Spread operator >> 

      const newArrayofPup = [...filterdata, edited]
      const newObjofPup = { puppies: newArrayofPup }
      // console.log(obj);

      const finalPup = JSON.stringify(newObjofPup, null, 2)
      console.log(finalPup);
      fs.writeFile('./data.json', finalPup, 'utf-8', null, 2)

    })


    .then(() => {
      return res.redirect(`/puppies/${id}`) // redirect takes one parameter
    }
    )

    .catch(err => {
      console.err('Opps')
    })

})

