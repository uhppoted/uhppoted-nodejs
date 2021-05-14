module.exports = {
  Config: require('./src/config.js').Config,

  getDevices: require('./src/get-devices.js'),
  getDevice: require('./src/get-device.js'),

  setIP: require('./src/set-ip.js'),
  getListener: require('./src/get-listener.js'),
  setListener: require('./src/set-listener.js'),
  getTime: require('./src/get-time.js'),
  setTime: require('./src/set-time.js'),
  getDoorControl: require('./src/get-door-control.js'),
  setDoorControl: require('./src/set-door-control.js'),

  getStatus: require('./src/get-status.js'),
  getCards: require('./src/get-cards.js'),
  getCard: require('./src/get-card.js'),
  getCardByIndex: require('./src/get-card-by-index.js'),
  putCard: require('./src/put-card.js'),
  deleteCard: require('./src/delete-card.js'),
  deleteCards: require('./src/delete-cards.js'),

  openDoor: require('./src/open-door.js'),

  recordSpecialEvents: require('./src/record-special-events.js'),
  getEventIndex: require('./src/get-event-index.js'),
  getEvent: require('./src/get-event.js'),

  listen: require('./src/listen.js')
}
