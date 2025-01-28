const uhppoted = require('uhppoted')
const ctx = require('./common.js')

const deviceID = 405419896
const addr = '192.168.1.100'
const now = new Date()

const format = (n, l) => String(n).padStart(l, '0')
const year = format(now.getFullYear(), 4)
const month = format(now.getMonth() + 1, 2)
const day = format(now.getDate(), 2)
const hours = format(now.getHours(), 2)
const minutes = format(now.getMinutes(), 2)
const seconds = format(now.getSeconds(), 2)
const datetime =
  year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds

async function run() {
  await uhppoted
    .setTime(ctx, deviceID, datetime)
    .then((response) => {
      console.log('\nset-time:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted
    .setTime(ctx, { id: deviceID, address: addr, protocol: 'tcp' }, datetime)
    .then((response) => {
      console.log('\nset-time:\n', response)
    })
    .catch((err) => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()
