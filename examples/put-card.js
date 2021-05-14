const ctx = require('./common.js')
const uhppoted = require('../index.js')
const card_number= '123456789'
const valid_from = '2020-01-01'
const valid_until = '2025-01-01'
const doors = {'1':true,'2':false,'3':true,'4':true}

uhppoted.putCard(ctx, 405419896 ,card_number, valid_from, valid_until, doors)
  .then(response => {
    console.log(response)
  })
  .catch(err => console.log('ERROR', err))
