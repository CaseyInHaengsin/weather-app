const axios = require('axios')
const LOCATIONS = require('./locations')

module.exports = async (location, concurrentCount) => {
  try {
    const requests = buildConcurrentRequest(
      LOCATIONS[location],
      concurrentCount
    )
    const responses = await Promise.all(requests)
    const data = responses.map(res => ({ location, data: res.data }))
    return data
  } catch (err) {
    console.log(err)
  }
}

function buildConcurrentRequest (location, concurrentCount) {
  const requests = []
  for (let i = 0; i < concurrentCount; i++) {
    console.log(location)
    requests.push(instance.get(`/${location}`))
  }

  return requests
}

const instance = axios.create({
  baseURL: 'https://www.metaweather.com/api/location'
})
