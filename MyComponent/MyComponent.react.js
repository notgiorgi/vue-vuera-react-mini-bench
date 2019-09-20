import React, { useState, useRef, useEffect } from 'react'

import './MyComponent.react.css'
import { randomNumbers } from '../config'

const MyComponent = () => {
  const [title, setTitle] = useState("Hello! I'm a react component!")
  const [count, setCount] = useState(0)
  const interval = useRef(null)
  useEffect(() => {
    setInterval(() => {
      setCount(s => s + 1)
    }, 1000)
    return () => {
      clearInterval(interval.current)
    }
  }, [])

  return (
    <div>
      <h1>Main Big HEADER</h1>

      <div>
        <h2>{title}</h2>
        <button onClick={() => setTitle('Updated tittle!')}>Update title</button>
      </div>

      <br />

      <div>
        <h2>Counter</h2>
        <p>Current count: {count}</p>
        <button onClick={() => setCount(0)}>Reset counter</button>
      </div>
      <br />

      <ol>
        {randomNumbers.map(num => (
          <li key={num.id}>{num.value}</li>
        ))}
      </ol>
      <hr />
    </div>
  )
}

export default MyComponent
