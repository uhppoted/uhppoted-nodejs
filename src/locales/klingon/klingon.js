const dict = new Map([
  ['unknown', 'Sov'],

  // event type
  ['eventNone', 'pagh'],
  ['eventSwipe', 'chevjaq'],
  ['eventDoor', 'lojmIt'],
  ['eventAlarm', 'ghum'],
  ['eventOverwritten', 'ngep'],

  // event direction
  ['directionIn', 'Daq'],
  ['directionOut', 'Qas'],

  // event reason
  ['swipe', "bl'"],
  ['swipeDenied', "jatlhbe'taHvIS."],
  ['noAccess', 'chuS'],
  ['incorrectPassword', 'lut'],
  ['antiPassback', "ghu'vam"],
  ['moreCards', 'Huch'],
  ['firstCardOpen', 'puq maqIp'],
  ['doorNormallyClosed', "batlh 'IQtaHghach 'IH"],
  ['interlock', 'tlhach'],
  ['notInAllowedTimePeriod', "chuq tu'be'lu'chugh woH"],
  ['invalidTimezone', 'tlhogh'],
  ['accessDenied', "na'"],
  ['pushbuttonOk', "bIQHa'"],
  ['doorOpened', 'poS'],
  ['doorClosed', 'qorDay'],
  ['supervisorDoorOpen', "mu'tlhegh wIpuvtaHvIS."],
  ['controllerPowerOn', 'boq'],
  ['controllerReset', 'qeS'],
  ['pushbuttonDoorLocked', "not tlhIngan lunuSlu'be'bogh lut rurnIS."],
  ['pushbuttonOffline', "(ngoDvam ngablaHbe'chu' chaH."],
  ['pushbuttonInterlock', "ngoDvamdaq ngIb rur neHlaHbe' je."],
  ['pushbuttonThreat', "'ong jublaHbe'bogh chutvam, nongDaj."],
  ['doorOpenTooLong', 'lojmIt'],
  ['forcedOpen', "pe'vIl"],
  ['fire', 'baH'],
  ['forcedClosed', 'tlhaQ'],
  ['theftPrevention', "lutu'lu'"],
  ['zone24x7', 'tlham'],
  ['emergency', 'chach'],
  ['remoteOpenDoor', 'lojmIt'],
  ['usbOpenDoor', "tu'lu'"],
  ['reserved', "tu'lu'"],

  // doors
  ['normallyOpen', 'motlh'],
  ['normallyClosed', "jajlo'"],
  ['controlled', 'ngeD'],

  // errors
  ['invalidDeviceID', 'jItoj'],
  ['invalidCardNumber', "puqwI'"],
  ['invalidCardIndex', "pe'vIl"],
  ['invalidDoor', 'pIv'],
  ['invalidEventIndex', 'jot'],
  ['invalidFunctionCode', "yotlhHa'taHvIS qaD"],
  ['invalidDoorControl', 'lojmIt'],
  ['invalidPermission', 'qaStaHvIS ramvam,'],
  ['invalidTaskType', "Soy'taH"],
  ['noReply', 'jach'],
  ['noBroadcastReply', "ghu' vIqelnIS"],
  ['invalidBroadcastReply', "tlhoy ghoghDI' vay' lughajlaHbe'taHvIS,"],
  ['timeout', 'run'],
  ['eventMissing', 'yav'],
  ['eventOverwritten', 'jup']
])

exports = module.exports = dict
