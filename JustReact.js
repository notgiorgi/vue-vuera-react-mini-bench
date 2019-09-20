import React from 'react'
import { render } from 'react-dom'
import { COMPONENT_INSTANCES_N } from './config'
import MyComponent from './MyComponent/MyComponent.react'

const instances = new Array(COMPONENT_INSTANCES_N).fill(0)
const App = () => {
  return (
    <div>
      {instances.map(x => (
        <MyComponent key={x} />
      ))}
    </div>
  )
}

render(<App />, document.getElementById('root'))
