const axios = require('axios')
const LOCATIONS = require('./locations')

module.exports = async (location, concurrentCount) => {
  try {
    switch (location) {
      case 'SLC':
        console.log('location', LOCATIONS[location])
        return await instance.all(
          buildConcurrentRequest(LOCATIONS[location], concurrentCount)
        )
      case 'LA':
        console.log('location', LOCATIONS[location])
        return await instance.all(
          buildConcurrentRequest(LOCATIONS[location], concurrentCount)
        )
      case 'BOISE':
        console.log('location', LOCATIONS[location])
        return await instance.all(
          buildConcurrentRequest(LOCATIONS[location], concurrentCount)
        )
    }
  } catch (err) {}
}

function buildConcurrentRequest (location, concurrentCount) {
  const requests = []
  for (let i = 0; i < concurrentCount; i++) {
    requests.push(instance.get(location))
  }
  return requests
}

const instance = axios.create({
  baseURL: 'https://www.metaweather.com/api/location/'
})
