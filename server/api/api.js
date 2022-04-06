const axios = require('axios')
const LOCATIONS = require('./locations')

module.exports = async (location, concurrentCount) => {
  try {
    const requests = buildConcurrentRequest(
      LOCATIONS[location],
      concurrentCount
    )
    return await Promise.all(requests)
  } catch (err) {}
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
