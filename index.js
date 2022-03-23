const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const stream = require('./streaming')

// disponibiliza nosso front end (public/index.html)
const staticPath = path.join(__dirname, '/public')
app.use('/', express.static(staticPath))

// disponibiliza o endpoint com a lógica do stream
app.get('/stream', stream.stream)

// lógica modificada para envio de .m4s
app.get('/altstream', stream.altstream)

app.get('/altstream2', stream.altstream2)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})