module.exports = {
  Config: require('./src/config.js').Config,
  addDevice: require('./src/config.js').addDevice,

  getDevices: require('./src/uhppoted.js').getDevices,
  getDevice: require('./src/uhppoted.js').getDevice,
  setIP: require('./src/uhppoted.js').setIP,
  getListener: require('./src/uhppoted.js').getListener,
  setListener: require('./src/uhppoted.js').setListener,
  getTime: require('./src/uhppoted.js').getTime,
  setTime: require('./src/uhppoted.js').setTime,
  getDoorControl: require('./src/uhppoted.js').getDoorControl,
  setDoorControl: require('./src/uhppoted.js').setDoorControl,
  recordSpecialEvents: require('./src/uhppoted.js').recordSpecialEvents,

  getStatus: require('./src/uhppoted.js').getStatus,
  getCards: require('./src/uhppoted.js').getCards,
  getCard: require('./src/uhppoted.js').getCard,
  getCardByIndex: require('./src/uhppoted.js').getCardByIndex,
  putCard: require('./src/uhppoted.js').putCard,
  deleteCard: require('./src/uhppoted.js').deleteCard,
  deleteCards: require('./src/uhppoted.js').deleteCards,

  getTimeProfile: require('./src/uhppoted.js').getTimeProfile,

  getEvents: require('./src/uhppoted.js').getEvents,
  getEvent: require('./src/uhppoted.js').getEvent,
  getEventIndex: require('./src/uhppoted.js').getEventIndex,
  setEventIndex: require('./src/uhppoted.js').setEventIndex,

  openDoor: require('./src/uhppoted.js').openDoor,

  listen: require('./src/uhppoted.js').listen
}
