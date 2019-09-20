const fs = require('fs')
const util = require('util')
const path = require('path')
const async = require('async')

const auditor = require('./lighthouse')
const dirExists = util.promisify(fs.exists)
const mkdir = util.promisify(fs.mkdir)
const writeFile = util.promisify(fs.writeFile)

const sites = [
  { name: 'just_react', url: 'http://localhost:8080/just_react.html' },
  { name: 'react_and_vuera', url: 'http://localhost:8080/react_and_vuera.html' },
  { name: 'plain_react_and_vue', url: 'http://localhost:8080/plain_react_and_vue.html' },
]
const RUNS_COUNT = process.env.RUNS_COUNT || 5

const auditsDirectory = path.join(__dirname, `./audits`)

async function main() {
  if (!(await dirExists(auditsDirectory))) {
    console.log('Creating directory', auditsDirectory)
    await mkdir(auditsDirectory)
  }

  const allResults = []
  try {
    await async.timesSeries(RUNS_COUNT, async n => {
      const results = await runAudit(n)
      allResults.push(results)
    })
    console.log('All audits run successfully')
    console.log(util.inspect(generateAverageReport(allResults)))
    console.log('For full summary, check out the audit files in the auditor/audits directory')
    console.log(
      'https://googlechrome.github.io/lighthouse/viewer/#performance can be used for reading them',
    )
  } catch (e) {
    console.error(e)
  }
}

async function runAudit(auditIndex) {
  const results = {}
  console.log(`Cycle #${auditIndex + 1}`)
  await async.eachOfSeries(sites, async ({ name, url }) => {
    const result = await auditor(url)
    console.log(' Auditing', url)
    const resultPath = path.join(auditsDirectory, `audit_${auditIndex}_${name}.json`)
    console.log(` Auditing ${url} successful, writing result to the file`, resultPath)
    await writeFile(resultPath, JSON.stringify(result))

    results[name] = {
      firstMeaningfulPaint: result.audits['first-meaningful-paint'],
      firstContentfulPaint: result.audits['first-contentful-paint'],
      speedIndex: result.audits['speed-index'],
    }
  })
  console.group(`audit+${auditIndex}`)
  generateMiniReport(results)
  console.groupEnd(`audit+${auditIndex}`)
  return results
}

function generateMiniReport(results) {
  console.log('Mini summary:')
  Object.keys(results).forEach(key => {
    console.log('\t', key)
    Object.values(results[key]).forEach(audit => {
      console.log(`\t\t ${audit.title}: ${audit.numericValue}`)
    })
  })
}

const auditKeys = ['firstMeaningfulPaint', 'firstContentfulPaint', 'speedIndex']
async function generateAverageReport(results) {
  const avg = sites.reduce((acc, x) => {
    return {
      ...acc,
      [x.name]: auditKeys.reduce((accu, y) => {
        return {
          ...accu,
          [y]: 0,
        }
      }, {}),
    }
  }, {})

  results.forEach(result => {
    Object.keys(result).forEach(site => {
      Object.keys(result[site]).forEach(auditName => {
        avg[site][auditName] += result[site][auditName].numericValue / RUNS_COUNT
      })
    })
  })

  return avg
}

main()
