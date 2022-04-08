import React from 'react'

function Card ({ location, data }) {
  const { commonWeather, average } = data
  const baseSvGUrl = `https://www.metaweather.com/static/img/weather/${commonWeather}.svg`
  return (
    <div className='card w-1/2 m-2'>
      <img src={baseSvGUrl} className='object-contain h-48 w-auto' />
      <div className='card-body'>
        <div className='card-title mb-2 justify-center'>{location}</div>
        <div className='card-actions justify-center'>
          <div className='stat'>
            <div className='stat-title'>Average High</div>
            {
              <div className='stat-value text-primary'>
                {(Math.floor((average * 9) / 5 + 32) * 100) / 100}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
