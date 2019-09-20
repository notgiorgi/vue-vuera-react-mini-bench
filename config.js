export const COMPONENT_INSTANCES_N = 10

// HELPERS
function appendRoot(id) {
  const div = document.createElement('div')
  div.id = id
  document.body.append(div)
}

export function createRoots(n) {
  appendRoot('root')
  for (let i = 0; i < n; i++) {
    appendRoot(getRootId(i + 1))
  }
}

export function getRootId(n) {
  return `root_${n}`
}

function generateRandomNumbers(n) {
  const out = []
  for (let i = 0; i < n; i++) {
    out.push({ value: Math.random(), id: i })
  }
  return out
}

export const randomNumbers = generateRandomNumbers(1000)
