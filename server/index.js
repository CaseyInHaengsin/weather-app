const express = require('express')
const cors = require('cors')
const app = express()
const api = require('./api/api')
const locations = require('./api/locations')

app.use(express.json())
app.use(cors())
app.use(express.static('../dist'))

app.get('/api/locations', (req, res) => {
  res.status(200).json({ locations: Object.keys(locations) })
})

app.get('/locationdata', async (req, res) => {
  const { concurrentCount } = req.query
  const count = concurrentCount ?? 2
  const data = Object.keys(locations).map(async location =>
    api(location, count)
  )

  res.status(200).json({
    locationData: await Promise.all(data)
  })
})

app.get('/api/:location/:concurrentcount', async (req, res) => {
  const { location, concurrentcount } = req.params
  console.log('concurrentcount', concurrentcount)
  const data = await api(location.toUpperCase(), concurrentcount).catch(err =>
    console.log(err)
  )
  console.log('data', data)
  const resp = data?.map(res => res.data)
  res.json({ weather: resp })
})

app.listen(3001, () => {
  console.log('listening, I promise')
})
