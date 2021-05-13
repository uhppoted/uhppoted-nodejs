const ctx = require('./common.js')
const uhppoted = require('../index.js')

const format = (n, l) => String(n).padStart(l, '0')
const now = new Date()

const year = format(now.getFullYear(), 4)
const month = format(now.getMonth() + 1, 2)
const day = format(now.getDate(), 2)
const hours = format(now.getHours(), 2)
const minutes = format(now.getMinutes(), 2)
const seconds = format(now.getSeconds(), 2)
const datetime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds

uhppoted.setTime(ctx, 405419896, datetime)
  .then(response => console.log('\nset-time:\n', response))
  .catch(err => console.log('ERROR', err))
