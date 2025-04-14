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
  setDoorPasscodes: require('./src/uhppoted.js').setDoorPasscodes,

  getStatus: require('./src/uhppoted.js').getStatus,
  getCards: require('./src/uhppoted.js').getCards,
  getCard: require('./src/uhppoted.js').getCard,
  getCardByIndex: require('./src/uhppoted.js').getCardByIndex,
  putCard: require('./src/uhppoted.js').putCard,
  deleteCard: require('./src/uhppoted.js').deleteCard,
  deleteCards: require('./src/uhppoted.js').deleteCards,

  getTimeProfile: require('./src/uhppoted.js').getTimeProfile,
  setTimeProfile: require('./src/uhppoted.js').setTimeProfile,
  clearTimeProfiles: require('./src/uhppoted.js').clearTimeProfiles,

  clearTaskList: require('./src/uhppoted.js').clearTaskList,
  addTask: require('./src/uhppoted.js').addTask,
  refreshTaskList: require('./src/uhppoted.js').refreshTaskList,

  getEvents: require('./src/uhppoted.js').getEvents,
  getEvent: require('./src/uhppoted.js').getEvent,
  getEventIndex: require('./src/uhppoted.js').getEventIndex,
  setEventIndex: require('./src/uhppoted.js').setEventIndex,
  recordSpecialEvents: require('./src/uhppoted.js').recordSpecialEvents,

  openDoor: require('./src/uhppoted.js').openDoor,
  setPCControl: require('./src/uhppoted.js').setPCControl,
  setInterlock: require('./src/uhppoted.js').setInterlock,
  activateKeypads: require('./src/uhppoted.js').activateKeypads,

  getAntiPassback: require('./src/uhppoted.js').getAntiPassback,
  setAntiPassback: require('./src/uhppoted.js').setAntiPassback,

  restoreDefaultParameters: require('./src/uhppoted.js').restoreDefaultParameters,

  listen: require('./src/uhppoted.js').listen
}
