## Description

We have a component `MyComponent` implemented in both react and vue
MyComponent renders:

- Normal `h1`
- Counter (using setInterval)
- And a list of 1000 random numbers

We're benchmarking three scenarios:

1. Rendering React root, with N number of MyComponent (implemented in React) instances [Source](./JustReact.js)
2. Rendering React root, with N number of MyComponent (implemented in Vue) instances, using [`vuera`](https://github.com/akxcv/vuera) [Source](./ReactAndVuera.js)
3. Rendering React root, with N number of MyComponent (implemented in Vue) instances. React just renders the root divs, and then in useEffect hook they mount using `Vue#$mount` [Source](./PlainReactAndVue.js)

## Usage

To run the audits:

```bash
yarn install
yarn start

# then in the different terminal:
# requires chrome and might take about 5 minutes
RUNS_COUNT=5 yarn audit
```

results will be displayed in terminal, more in depth audits are in `auditor/audits` directory

## Findings

Average result of 10 runs (lower is better):

![10 runs](https://i.imgur.com/rfO8TXU.png)
