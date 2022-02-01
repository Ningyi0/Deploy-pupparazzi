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
//     .then((data) => {
//       return JSON.parse(data)
//     })
//     .then((result) => {
//       result.puppies.map((pupp) => {
//         if (pupp.id === id) {
//           pupp = editDumbPup
//         }
//       })
//       return pupp
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })

// const parsedData = JSON.parse(fs.readFile('./data.json'))

// fs.readFile('./data.json', 'utf-8').then(function (result) {
//   const parsedData = JSON.parse(result)

// parsedData.puppies.map((pup) => {
//   if (pup.id === id) {
//     pup = editDumbPup
//   }
//   console.log(pup)
//   return pup
// })

// parsedData.puppies = updatedData
// const pups = JSON.stringify(parsedData)

//   fs.writeFile('./data.json', parsedData, 'utf-8')
//     .then(() => {
//       return res.redirect(`/puppies/${id}`)
//     })
//     .catch((err) => {
//       console.error(err.message)
//     })
// })

// fs.readFile('./data.json', 'utf-8')
//   .then(function (result) {
//     const parsedData = JSON.parse(result)

//     let updatedData = parsedData.puppies.map(puppy => {
//       if (puppy.id === id) {

//         puppy = editDumbPup
//       }
//       console.log(pup)
//       return pup
//     })

//     parsedData.puppies = updatedData
//     formattedData = JSON.stringify(parsedData)

//     fs.writeFile('./data.json', formattedData, 'utf-8')
//       .then(() => {
//         return res.redirect(`/puppies/${id}`)
//       })
//       .catch(err => {
//         console.error(err.message)
//       })
//     })
//   })

module.exports = router
