const server = require('./server')

// // const port = 3000
// const PORT = process.env.PORT || 3000

// server.listen(port, '0.0.0.0', function () {
//   // eslint-disable-next-line no-console
//   console.log('Server is listening on port', port)
// })
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Our app is running on port ${PORT}`)
})
