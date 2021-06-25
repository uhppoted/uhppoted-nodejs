const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896

uhppoted.refreshTaskList(ctx, deviceID)
  .then(response => {
    console.log('\nrefresh-task-list:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })
