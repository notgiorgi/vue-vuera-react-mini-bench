import React, { useEffect, useRef } from 'react'
import { render } from 'react-dom'
import Vue from 'vue/dist/vue.js'
import { COMPONENT_INSTANCES_N, getRootId } from './config'
import MyComponent from './MyComponent/Mycomponent.vue'

const instances = new Array(COMPONENT_INSTANCES_N).fill(0)

const App = () => {
  const vms = useRef([])
  useEffect(() => {
    instances.forEach((_, i) => {
      const vm = new Vue({
        components: {
          MyComponent,
        },
        render: function(h) {
          return h('MyComponent', {
            props: {
              something: 'GOT THIS TEXT PASSERD FROM PLAIN REACT useEffect!',
            },
          })
        },
      })

      vm.$mount('#' + getRootId(i + 1))
      vms.current[i] = vm
    })

    return () => {
      instances.forEach((_, i) => {
        vms.current[i].$unmount()
      })
    }
  }, [])

  return (
    <div>
      {instances.map((x, i) => (
        <div key={x} id={getRootId(i + 1)} />
      ))}
    </div>
  )
}

render(<App />, document.getElementById('root'))
