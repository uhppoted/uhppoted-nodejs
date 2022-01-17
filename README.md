![build](https://github.com/uhppoted/uhppoted-nodejs/workflows/build/badge.svg)
![NPM version](https://badge.fury.io/js/uhppoted.svg)
![NPM](https://img.shields.io/npm/l/uhppoted)

NodeJS module that implements an API for interacting with a UHPPOTE TCP/IP Wiegand access controller board. The API supports device and card management as well as handling for events.

#### Requirements:
- `node.js` version 14.18.3+
- `ip.js` version 1.1.5+ 

For the latest updates see the [CHANGELOG.md](https://github.com/uhppoted/uhppoted-nodejs/blob/master/CHANGELOG.md)

#### Installation

```
npm install uhppoted
```

### API

- [`getDevices`](#getdevices) fetches a list of access controllers on the local LAN
- [`getDevice`](#getdevice) retrieves the information for a single access controller
- [`setIP`](#setip) sets the controller IP address, net mask and gateway address
- [`getTime`](#gettime) retrieves the current controller date and time
- [`setTime`](#settime) sets the controller date and time
- [`getDoorControl`](#getdoorcontrol) retrieves the controller door delay and control
- [`setDoorControl`](#setdoorcontrol) sets the delay and control mode for a door
- [`getListener`](#getlistener) retrieves the IP _address:port_ to which controller events are sent
- [`setListener`](#setlistener) sets the IP _address:port_ to which controller events are sent
- [`recordSpecialEvents`](#recordspecialevents) enables or disables door open and close input events
- [`getStatus`](#getstatus) retrieves a controller status
- [`getCards`](#getcards) retrieves the number of card records on a controller
- [`getCard`](#getcard) retrieves a card record from a controller
- [`getCardByIndex`](#getcardbyindex) retrieves a card record by record number
- [`putCard`](#putcard) creates or updates a card record on a controller
- [`deleteCard`](#deletecard) deletes a card record from a controller
- [`deleteCards`](#deletecards) deletes all card records from a controller
- [`getTimeProfile`](#gettimeprofile) retrieves a time profile from a controller
- [`setTimeProfile`](#settimeprofile) creates or updates a time profile on a controller
- [`clearTimeProfiles`](#cleartimeprofiles) deletes all time profiles from a controller
- [`clearTaskList`](#cleartasklist) clears the task list on a controller
- [`addTask`](#addtask) adds a new task to the task list on a controller
- [`refreshTaskList`](#refreshtasklist) refreshes the task list on a controller
- [`getEvents`](#getevents) retrieves the indices of the first and last event records stored on a controller
- [`getEvent`](#getevent) retrieves an event from a controller
- [`getEventIndex`](#geteventindex) retrieves the event index user value from a controller
- [`setEventIndex`](#seteventindex) sets the event index user value on a controller
- [`openDoor`](#opendoor) remotely unlocks a door
- [`listen`](#listen) establishes a listening connection for controller events

Each API call takes a `context` _object_ as the first argument, followed by the function specific parameters and returns a `Promise` that resolves to a response.

#### Example
```
const uhppoted = require('uhppoted')

const bind = '0.0.0.0'
const broadcast = '255.255.255.255:60000'
const listen = '0.0.0.0:60001'
const timeout = 2500
const debug = true

const ctx = {
  config: new uhppoted.Config('example', bind, broadcast, listen, timeout, [], debug)
}

uhppoted.getDevices(ctx)
  .then(response => {
    console.log('\nget-devices:\n', response)
  })
  .catch(err => {
    console.log(`\n   *** ERROR ${err.message}\n`)
  })
```

A minimal example showing the usage for each API can be found in the [_examples_](https://github.com/uhppoted/uhppoted-nodejs/tree/master/examples) folder. The _examples_ have `uhppoted` as a dependency - install either the published
`uhppoted` module in the examples folder:
```
cd examples
npm install uhppoted
```
or if working from a cloned repository, install the development version:
```
cd examples
npm install ..
```

#### Context

A `context` object comprises:
```
   {
      config: { ... },
      locale: string,
      logger: function
   }
```

All `context` fields are optional and defaults will be used if not provided. The `config` _field_ is a `configuration` object comprising:
```
   {
      name: string,
      bind: string,
      broadcast: string,
      listen: string,
      timeout: integer,
      devices: [..],
      debug: bool
   }
```
where:
- `name` is an identifying string. Defaults 'uhppoted'.
- `bind` is the IP address:port to which to bind for requests. Defaults to '0.0.0.0:0'.
- `broadcast` is the IP address:port to which to send requests. Defaults to '255.255.255.255:60000'.
- `listen` is the IP address:port on which to listen for events. Defaults to '0.0.0.0:60001'.
- `timeout` is  maximum time to wait for a response, in milliseconds. Default to 5000.
- `devices` is an optional list of controller specific configuration information. 
- `debug` displays debugging information if `true`. Defaults to `false`.

The `devices` list comprises an array of device specific information for controllers that are not reachable using UDP broadcast on the local LAN:
```
   {
     deviceId: integer,
     address: string,
     forceBroadcast: bool
   }
```
where:
- `deviceId` is the serial number of the controller
- `address` is the device IP address and port, formatted as _address:port_
- `forceBroadcast` ensures the use of UDP broadcast to send requests to the controller

The `locale` string corresponds to one of the supported locales:
- _en-US_

and defines the translation of string literals in the responses and error messages. It defaults to _en-US_ if not supplied or if the provided locale is not supported.

The `logger` function takes a single `message` parameter and logs it as appropriate to the application. The default implementation prepends the date and time to the message and writes it to the console.

#### `getDevices`

Fetches a list of access controllers on the local LAN.
```
uhppoted.getDevices(ctx)
````
Returns a list of `device` objects, e.g.:
```
[
  {
    deviceId: controller ,
    device: {
      serialNumber: 201020304,
      address: '192.168.1.101',
      netmask: '255.255.255.0',
      gateway: '192.168.1.1',
      MAC: '52:fd:fc:07:21:82',
      version: '0662',
      date: '2020-01-01'
    }
  },
  ...
]
```

#### `getDevice`

Retrieves the information for a single access controller.
```
uhppoted.getDevice(ctx, deviceId)
```
- `deviceId`: serial number of controller

Returns a `device` object, e.g.:
```
{
  deviceId: controller ,
  device: {
    serialNumber: 201020304,
    address: '192.168.1.101',
    netmask: '255.255.255.0',
    gateway: '192.168.1.1',
    MAC: '52:fd:fc:07:21:82',
    version: '0662',
    date: '2020-01-01'
  }
   }
```

#### `setIP`

Sets the controller IP address, net mask and gateway address.
```
uhppoted.setIP (ctx, deviceId, address, netmask, gateway)
```
- `deviceId`: serial number of controller
- `address`: IPv4 address of controller
- `netmask`: IPv4 subnet mask of controller
- `gateway`: IPv4 address of the LAN gateway

Returns an _empty_ object, e.g.:
```
{}
```

#### `getTime`

Retrieves the current controller date and time.
```
uhppoted.getTime (ctx, deviceId)
```
- `deviceId`: serial number of controller

Returns a `datetime` object, e.g.:
```
{ deviceId: 405419896, datetime: '2021-06-04 14:29:08' }
```

#### `setTime`

Sets the controller date and time.
```
uhppoted.setTime (ctx, deviceId, datetime)
```
- `deviceId`: serial number of controller
- `datetime`: YYYY-mm-dd HH:mm:ss

Returns a `datetime` object, e.g.:
```
{ deviceId: 405419896, datetime: '2021-06-04 14:29:08' }
```

#### `getDoorControl`

Retrieves the controller door delay and control mode for a door.
```
uhppoted.getDoorControl (ctx, deviceId, door)
```
- `deviceId`: serial number of controller
- `door`: 1-4

Returns a `door-control` object, e.g.:
```
{
  deviceId: 405419896,
  doorControlState: { 
    door: 3, 
    delay: 7, 
    control: { value: 3, state: 'controlled' } 
  }
}
```

#### `setDoorControl`

Sets the delay and control mode for a door.
```
uhppoted.setDoorControl (ctx, deviceId, door, delay, mode)
```
- `deviceId`: serial number of controller
- `door`: 1-4
- `delay`: seconds
- `mode`: _normally open_, _normally closed_ or _controlled_

Returns a door control object, e.g.:
```
{
  deviceId: 405419896,
  doorControlState: {
    door: 3,
    delay: 4,
    control: { value: 2, state: 'normally closed' }
  }
}
```

#### `getListener`

Retrieves the host:port IP address to which controller events are sent.

```
uhppoted.getListener (ctx, deviceId) 
```
- `deviceId`: serial number of controller

Returns a `listener` object, e.g.:
```
{ deviceId: 405419896, address: '192.168.1.100', port: 60001 }
```

#### `setListener`

Sets the host:port IP address to which controller events are sent.
```
uhppoted.setListener (ctx, deviceId, address, port) 
```
- `deviceId`: serial number of controller
- `address`: IPv4 address of event listener
- `port`: UDP port on which event listener is expecting events

Returns an `updated` result object, e.g.:
```
{ deviceId: 405419896, updated: true }
```

#### `recordSpecialEvents`

Enables or disables door open and close input events.

```
uhppoted.recordSpecialEvents (ctx, deviceId, enable)
```
- `deviceId`: serial number of controller
- `enable`: enables door open and closed events if _true_

Returns an `updated` result object, e.g.:
```
{ deviceId: 405419896, updated: true }
```

#### `getStatus`

Retrieves a controller status.

```
uhppoted.getStatus (ctx, deviceId)
```
- `deviceId`: serial number of controller

Returns a `status` object, e.g.:
```
{
  deviceId: 405419896,
  state: {
    serialNumber: 405419896,
    event: {
      index: 69,
      type: [Object],
      granted: true,
      door: 1,
      direction: [Object],
      card: 0,
      timestamp: '2019-08-10 10:28:32',
      reason: [Object]
    },
    doors: { '1': false, '2': false, '3': false, '4': false },
    buttons: { '1': false, '2': false, '3': false, '4': false },
    system: { status: 0, date: '2021-06-04', time: '15:48:07' },
    specialInfo: 0,
    relays: { state: 0, relays: [Object] },
    inputs: { state: 0, forceLock: false, fireAlarm: false }
  }
}
```

#### `getCards`

Retrieves the number of card records stored on a controller. The returned may include
deleted records.

```
uhppoted.getCards (ctx, deviceId)
```
- `deviceId`: serial number of controller

Returns the a `cards` object, e.g.:
```
{ deviceId: 405419896, cards: 37 }
```

#### `getCard`

Retrieves a single card record from a controller.

```
uhppoted.getCard (ctx, deviceId, cardNumber) 
```
- `deviceId`: serial number of controller
- `cardNumber`: card number

Returns the card record for the card number, e.g.:
```
{
  deviceId: 405419896,
  card: {
    number: 8165538,
    valid: { from: '2021-01-01', to: '2021-12-31' },
    doors: { '1': true, '2': false, '3': false, '4': true }
  }
}
```

#### `getCardByIndex`

Retrieves a single card record from a controller by record number.

```
uhppoted.getCardByIndex (ctx, deviceId, index)
```
- `deviceId`: serial number of controller
- `index`: record index of card

Returns the card record at the index, e.g.:
```
{
  deviceId: 405419896,
  card: {
    number: 8165539,
    valid: { from: '2021-01-01', to: '2021-12-31' },
    doors: { '1': false, '2': false, '3': false, '4': false }
  }
}
```
#### `putCard`

Adds or updates a single card record on a controller.

```
uhppoted.putCard (ctx, deviceId, cardNumber, validFrom, validUntil, doors)
```
- `deviceId`: serial number of controller
- `cardNumber`: card number
- `validFrom`: date from which card is valid (YYYY-mm-dd)
- `validUntil`: date after which which card is no longer valid (YYYY-mm-dd)
- `doors`: map of doors to access permissions for the card e.g. _{ 1: true, 2: false, 3: 29, 4: true }_. A
permission may be `true`, `false` or a time profile in the range [2..254].

Returns a `stored` result object, e.g.:
```
{ deviceId: 405419896, stored: true }
```

#### `deleteCard`

Deletes a single card record from a controller.

```
uhppoted.deleteCard (ctx, deviceId, cardNumber)
```
- `deviceId`: serial number of controller
- `cardNumber`: card number

Returns a `deleted` result object, e.g.:
```
{ deviceId: 405419896, deleted: true }
```

#### `deleteCards`

Deletes all card records stored on a controller.

```
uhppoted.deleteCards (ctx, deviceId) 
```
- `deviceId`: serial number of controller

Returns a `deleted` result object, e.g.:
```
{ deviceId: 405419896, deleted: true }
```

#### `getTimeProfile`

Retrieves a time profile from a controller.

```
uhppoted.getTimeProfile (ctx, deviceId, profileId) 
```
- `deviceId`: serial number of controller
- `profileId`: time profile ID (in the range [2..254])

Returns the time profile defined (if any) for the profile ID, e.g.:
```
{
  deviceId: 405419896,
  profile: {
    id: 29,
    valid: { from: '2021-01-01', to: '2021-12-31' },
    weekdays: [ 'Monday', 'Wednesday', 'Friday' ],
    segments: [ 
      { start:'08:30', end:'11:45' },
      { start:'13:15', end:'17:30' }
    ],
    linkedTo: 3
  }
```

#### `setTimeProfile`

Creates or updates a time profile on a controller. The time profile may have up to 3 segments 
and may optionally be _linked_ to another profile to extend the definition.

```
uhppoted.setTimeProfile (ctx, deviceId, profile) 
```
- `deviceId`: serial number of controller
- `profile`: time profile e.g.
```
{
  deviceId: 405419896,
  profile: {
    id: 29,
    valid: { from: '2021-01-01', to: '2021-12-31' },
    weekdays: [ 'Monday', 'Wednesday', 'Friday' ],
    segments: [ 
      { start:'08:30', end:'11:45' },
      { start:'13:15', end:'17:30' }
    ],
    linkedTo: 3
  }
```

Returns an `updated` result object, e.g.:
```
{ deviceId: 405419896, updated: true }
```

#### `clearTimeProfiles`

Deletes all time profiles from a controller.

```
uhppoted.clearTimeProfiles (ctx, deviceId) 
```
- `deviceId`: serial number of controller

Returns a `cleared` result object, e.g.:
```
{ deviceId: 405419896, cleared: true }
```

#### `clearTaskList`

Clears the task list on controller.

```
uhppoted.clearTaskList (ctx, deviceId) 
```
- `deviceId`: serial number of controller

Returns a `cleared` result object, e.g.:
```
{ deviceId: 405419896, cleared: true }
```


#### `addTask`

Creates a new task definion on a controller.or updates a time profile on a controller. The task
will be activated once `refreshTaskList` is invoked.

A task definion comprises the following fields:
- task type: numeric or string task type from the list below
- door: door to which the task is assigned
- valid: from/to dates (inclusive) between which the task is active
- weekdays: days of the week on which the task is active
- start: time at which to run task
- cards: (for _enable more cards_ only) number of _more cards_ to allow

Valid task type IDs and the corresponding task types are:
- 1: door controlled
- 2: door normallyopen
- 3: door normallyclosed
- 4: disable time profile
- 5: enable time profile
- 6: card + no password
- 7: card + IN password
- 8: card + password
- 9: enable more cards
- 10: disable more cards
- 11: trigger once
- 12: disable push button
- 13: enable push button

(the `addTask` function accepts both numeric and string task types)

```
uhppoted.addTask (ctx, deviceId, task) 
```
- `deviceId`: serial number of controller
- `task`: task definition e.g.
```
{
  deviceId: 405419896,
  task: {
    task: 'enable time profile',
    door: 3,
    valid: { from: '2021-01-01', to: '2021-12-31' },
    weekdays: [ 'Monday', 'Wednesday', 'Friday' ],
    start:'08:30',
    cards: 3
  }
```

#### `refreshTaskList`

Refreshes the task list on controller, activating any tasks added with `addTask`.

```
uhppoted.refreshTaskList (ctx, deviceId) 
```
- `deviceId`: serial number of controller

Returns a `refreshed` result object, e.g.:
```
{ deviceId: 405419896, refreshed: true }
```

#### `getEvents`

Retrieves the indices of the first and last event records stored on a controller.

```
uhppoted.getEvents (ctx, deviceId)
```
- `deviceId`: serial number of controller
- `index`: index of event (1-100000)

Returns an `events` record, e.g.:
```
{ deviceId: 405419896, first: 1, last: 70 }
```

#### `getEvent`

Retrieves a single event from a controller.

```
uhppoted.getEvent (ctx, deviceId, index)
```
- `deviceId`: serial number of controller
- `index`: index of event (1-100000)

Returns an event record, e.g.:
```
{
  deviceId: 405419896,
  event: {
    index: 29,
    type: { code: 2, event: 'door' },
    granted: true,
    door: 1,
    direction: { code: 1, direction: 'in' },
    card: 0,
    timestamp: '2019-08-03 10:34:29',
    reason: { code: 0, reason: '(reserved)' }
  }
}
```

#### `getEventIndex`

Retrieves the current event index user value from a controller.

```
uhppoted.getEventIndex (ctx, deviceId)
```
- `deviceId`: serial number of controller

Returns an `event-index` object, e.g.:
```
{ deviceId: 405419896, index: 29 }
```

#### `setEventIndex`

Sets the current event index user value on a controller.

```
uhppoted.setEventIndex (ctx, deviceId, index)
```
- `deviceId`: serial number of controller
- `index`: 1-100000

Returns an `updated` result object, e.g.:
```
{ deviceId: 405419896, updated: true }
```

#### `openDoor`

Remotely unlocks a door.

```
uhppoted.openDoor (ctx, deviceId, door)
```
- `deviceId`: serial number of controller
- `door`: 1-4

Returns an `opened` result object, e.g.
```
{ deviceId: 405419896, opened: true }
```

#### `listen`

Establishes a listening connection for controller events.

```
uhppoted.listen (ctx, onEvent, onError)
```
- `onEvent`: function that accepts and processes a received _event_ object
- `onError`: function that accepts and processes an Error object

Example `event` object:
```
{
  deviceId: 405419896,
  state: {
    serialNumber: 405419896,
    event: {
      index: 72,
      type: [Object],
      granted: false,
      door: 3,
      direction: [Object],
      card: 8165538,
      timestamp: '2021-06-04 16:37:01',
      reason: [Object]
    },
    doors: { '1': false, '2': false, '3': false, '4': false },
    buttons: { '1': false, '2': false, '3': false, '4': false },
    system: { status: 0, date: '2021-06-04', time: '16:37:01' },
    specialInfo: 0,
    relays: { state: 0, relays: [Object] },
    inputs: { state: 0, forceLock: false, fireAlarm: false }
  }
}
```

### Issues and Feature Requests

Please create an issue in the [uhppoted-nodejs](https://github.com/uhppoted/uhppoted-nodejs) _github_ repository.

### License

[MIT](https://github.com/uhppoted/uhppoted-nodejs/blob/master/LICENSE)
