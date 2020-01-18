const chalk = require('chalk')
const log = console.log
const success = chalk.green
const errorLine = chalk.red.bold

function printResult (list) {
  if (!list || !list.length) {
    log(success('The css is clean!'))
  } else {
    log('The following classes should be removed: ')
    list.forEach(line => {
      log(errorLine(line.map(step => `.${step}`).join(' ')))
    })
  }
}

module.exports = {
  printResult
}