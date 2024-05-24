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
const datetime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds

async function run () {
  await uhppoted.getDevice(ctx, { controller: deviceID, address: addr, protocol: 'tcp' })
    .then(response => {
      console.log('\nget-device:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.getListener(ctx, { controller: deviceID, address: addr, protocol: 'tcp' })
    .then(response => {
      console.log('\nget-listener:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.setListener(ctx, { controller: deviceID, address: addr, protocol: 'tcp' }, '192.168.1.100', 60001)
    .then(response => {
      console.log('\nset-listener:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.getTime(ctx, { controller: deviceID, address: addr, protocol: 'tcp' })
    .then(response => {
      console.log('\nget-time:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.setTime(ctx, { controller: deviceID, address: addr, protocol: 'tcp' }, datetime)
    .then(response => {
      console.log('\nset-time:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.getDoorControl(ctx, { controller: deviceID, address: addr, protocol: 'tcp' }, 3)
    .then(response => {
      console.log('\nget-door-control:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.setDoorControl(ctx, { controller: deviceID, address: addr, protocol: 'tcp' }, 3, 4, 'normally closed')
    .then(response => {
      console.log('\nset-door-control:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  await uhppoted.recordSpecialEvents(ctx, { controller: deviceID, address: addr, protocol: 'tcp' }, true)
    .then(response => {
      console.log('\nrecord-special-events:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })

  uhppoted.getStatus(ctx, { controller: deviceID, address: addr, protocol: 'tcp' })
    .then(response => {
      console.log('\nget-status:\n', response)
    })
    .catch(err => {
      console.log(`\n   *** ERROR ${err.message}\n`)
    })
}

run()
