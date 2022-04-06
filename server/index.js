const express = require('express')
const path = require('path')
const cors = require('cors')
const axios = require('axios')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('../dist'))

app.get('/api/:location/:concurrentcount', async (req, res) => {
  console.log('here I am')
  console.log(req.params)
  res.json({ yo: 'yo' })
})

app.listen(3001, () => {
  console.log('listening, I promise')
})
