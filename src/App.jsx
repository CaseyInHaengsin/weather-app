import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from './components/Card'
import './App.css'

const BASE_URL = 'http://localhost:3001/api'
const BASE_CONCURRENCY = 2

function getAverageAndSvg (data) {
  const tempData = []

  const maxTemp = data.reduce(weatherInstance => {
    const { consolidated_weather } = weatherInstance
    const maxTemps = consolidated_weather.map(day => day.max_temp)
    const commonWeatherTemp = consolidated_weather.map(
      day => day.weather_state_abbr
    )
    const commonWeather = mostCommon(commonWeatherTemp)
    return { maxTemps, commonWeather }
  })
  const { commonWeather, maxTemps } = maxTemp
  return { commonWeather, average: average(flatten(maxTemps)) }
}

const average = array => array.reduce((a, b) => a + b) / array.length

function flatten (arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
    )
  }, [])
}

function mostCommon (arr) {
  return arr
    .sort(
      (a, b) =>
        arr.filter(v => v === a).length - arr.filter(v => v === b).length
    )
    .pop()
}

function joinData (data) {
  return data.reduce((acc, val) => {
    const location = val[0].location
    const allData = val.map(item => item.data)
    return [...acc, { location, data: allData }]
  }, [])
}

function App () {
  const [slcWeather, setSlcWeather] = useState(null)
  const [locationData, setLocationData] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getWeather = async () => {
      const { data } = await axios.get(`${BASE_URL}/locationdata`)
      const { locationData } = data
      const consolidatedData = joinData(locationData)
      return consolidatedData
    }

    getWeather().then(data => {
      const joinedData = data.map(locationData => {
        const { location, data } = locationData
        const tempData = []
        data.forEach(d => tempData.push(d))
        return { location, data: tempData }
      })
      setLocationData(joinedData)
      setLoading(false)
    })
  }, [])
  if (loading) {
    return (
      <div className='m-6 h-screen flex items-center justify-center flex-col'>
        <progress className='progress w-56'></progress>
      </div>
    )
  }
  return (
    <div className='m-6 h-screen flex items-center justify-center flex-col'>
      <div className='area-input'></div>
      <div className='px-8 py-4 card-container flex w-full h-3/4'>
        {locationData &&
          locationData.map(location => {
            return (
              <Card
                key={location.location}
                location={location.location}
                data={getAverageAndSvg(location.data)}
              />
            )
          })}
      </div>
    </div>
  )
}

export default App
