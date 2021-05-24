const dict = new Map([
  ['unknown', 'unknown'],

  // event type
  ['eventNone', 'none'],
  ['eventSwipe', 'card swipe'],
  ['eventDoor', 'door'],
  ['eventAlarm', 'alarm'],
  ['eventOverwritten', '<overwritten>'],

  // event direction
  ['directionIn', 'in'],
  ['directionOut', 'out'],

  // event reason
  ['swipe', 'swipe'],
  ['swipeDenied', 'swipe:denied (system)'],
  ['noAccess', 'no access rights'],
  ['incorrectPassword', 'incorrect password'],
  ['antiPassback', 'anti-passback'],
  ['moreCards', 'more cards'],
  ['firstCardOpen', 'first card open'],
  ['doorNormallyClosed', 'door is normally closed'],
  ['interlock', 'interlock'],
  ['notInAllowedTimePeriod', 'not in allowed time period'],
  ['invalidTimezone', 'invalid timezone'],
  ['accessDenied', 'access denied'],
  ['pushbuttonOk', 'push button ok'],
  ['doorOpened', 'door opened'],
  ['doorClosed', 'door closed'],
  ['supervisorDoorOpen', 'door opened (supervisor password)'],
  ['controllerPowerOn', 'controller power on'],
  ['controllerReset', 'controller reset'],
  ['pushbuttonDoorLocked', 'pushbutton invalid (door locked)'],
  ['pushbuttonOffline', 'pushbutton invalid (offline)'],
  ['pushbuttonInterlock', 'pushbutton invalid (interlock)'],
  ['pushbuttonThreat', 'pushbutton invalid (threat)'],
  ['doorOpenTooLong', 'door open too long'],
  ['forcedOpen', 'forced open'],
  ['fire', 'fire'],
  ['forcedClosed', 'forced closed'],
  ['theftPrevention', 'theft prevention'],
  ['zone24x7', '24x7 zone'],
  ['emergency', 'emergency'],
  ['remoteOpenDoor', 'remote open door'],
  ['usbOpenDoor', 'remote open door (USB reader)'],
  ['reserved', '(reserved)'],

  // doors
  ['normallyOpen', 'normally open'],
  ['normallyClosed', 'normally closed'],
  ['controlled', 'controlled']
])

exports = module.exports = dict