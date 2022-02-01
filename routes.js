const express = require('express')
const fs = require('fs').promises

const router = express.Router()
module.exports = router

// Accept URL encoded data on POST request
router.use(express.urlencoded({ extended: false }))


router.get('/', (req, res) => {
  res.send('here is the profile page as read-only')
})
