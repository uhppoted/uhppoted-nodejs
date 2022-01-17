const dictionaries = new Map([
  ['en-US', require('./locales/en-US/en-US.js')],
  ['klingon', require('./locales/klingon/klingon.js')]
])

const enUS = require('./locales/en-US/en-US.js')

/**
  * Lookup table to associate message text to the equivalent internationalisation key.
  * @private
  */
const map = new Map([
  ['unknown', 'unknown'],

  // event type
  ['none', 'eventNone'],
  ['card swipe', 'eventSwipe'],
  ['door', 'eventDoor'],
  ['alarm', 'eventAlarm'],
  ['<overwritten>', 'eventOverwritten'],

  // event direction
  ['in', 'directionIn'],
  ['out', 'directionOut'],

  // event reason
  ['swipe', 'swipe'],
  ['swipe:denied (system)', 'swipeDenied'],
  ['no access rights', 'noAccess'],
  ['incorrect password', 'incorrectPassword'],
  ['anti-passback', 'antiPassback'],
  ['more cards', 'moreCards'],
  ['first card open', 'firstCardOpen'],
  ['door is normally closed', 'doorNormallyClosed'],
  ['interlock', 'interlock'],
  ['not in allowed time period', 'notInAllowedTimePeriod'],
  ['invalid timezone', 'invalidTimezone'],
  ['access denied', 'accessDenied'],
  ['push button ok', 'pushbuttonOk'],
  ['door opened', 'doorOpened'],
  ['door closed', 'doorClosed'],
  ['door opened (supervisor password)', 'supervisorDoorOpen'],
  ['controller power on', 'controllerPowerOn'],
  ['controller reset', 'controllerReset'],
  ['pushbutton invalid (door locked)', 'pushbuttonDoorLocked'],
  ['pushbutton invalid (offline)', 'pushbuttonOffline'],
  ['pushbutton invalid (interlock)', 'pushbuttonInterlock'],
  ['pushbutton invalid (threat)', 'pushbuttonThreat'],
  ['door open too long', 'doorOpenTooLong'],
  ['forced open', 'forcedOpen'],
  ['fire', 'fire'],
  ['forced closed', 'forcedClosed'],
  ['theft prevention', 'theftPrevention'],
  ['24x7 zone', 'zone24x7'],
  ['emergency', 'emergency'],
  ['remote open door', 'remoteOpenDoor'],
  ['remote open door (USB reader)', 'usbOpenDoor'],
  ['(reserved)', 'reserved'],

  // doors
  ['normally open', 'normallyOpen'],
  ['normally closed', 'normallyClosed'],
  ['controlled', 'controlled'],

  // errors
  ['invalid device ID', 'invalidDeviceID'],
  ['invalid card number', 'invalidCardNumber'],
  ['invalid card index', 'invalidCardIndex'],
  ['invalid door', 'invalidDoor'],
  ['invalid event index', 'invalidEventIndex'],
  ['invalid protocol function code', 'invalidFunctionCode'],
  ['invalid door control', 'invalidDoorControl'],
  ['invalid time profile for door', 'invalidPermission'],
  ['invalid task type', 'invalidTaskType'],
  ['no reply from', 'noReply'],
  ['no reply to broadcasted request', 'noBroadcastReply'],
  ['invalid reply to broadcasted request', 'invalidBroadcastReply'],
  ['timeout', 'timeout'],
  ['event does not exist', 'eventMissing'],
  ['event overwritten', 'eventOverwritten']
])

function translate (object, locale) {
  let dict = enUS
  if (locale && dictionaries.has(locale)) {
    dict = dictionaries.get(locale)
  }

  const lookup = function (match, token, offset, string) {
    if (map.has(token)) {
      const key = map.get(token)
      if (dict.has(key)) {
        return dict.get(key)
      }
    }

    return token
  }

  const blob = JSON.stringify(object)
  const translated = blob.replace(/{{(.*?)}}/g, lookup)

  return JSON.parse(translated)
}

module.exports = {
  translate: translate
}
