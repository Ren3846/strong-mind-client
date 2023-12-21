import React, { useState, useEffect } from 'react'
import './style.scss'

const Snowflake = () => (
  <div
    className='snowflake'
    style={{
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 3 + 2}s`,
    }}
  />
)

const Snowfall = ({ snowflakeCount = 100 }) => {
  const [snowflakes, setSnowflakes] = useState([])

  useEffect(() => {
    setSnowflakes(Array.from({ length: snowflakeCount }))
  }, [snowflakeCount])

  return (
    <div className='snowfall'>
      {snowflakes.map((_, index) => (
        <Snowflake key={index} />
      ))}
    </div>
  )
}

export default Snowfall
