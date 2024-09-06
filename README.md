![build](https://github.com/uhppoted/uhppoted-nodejs/workflows/build/badge.svg)
![NPM version](https://badge.fury.io/js/uhppoted.svg)
![NPM](https://img.shields.io/npm/l/uhppoted)

NodeJS module that implements an API for interacting with a UHPPOTE TCP/IP Wiegand access controller board. The API supports device and card management as well as handling for events.

#### Requirements:
- `node.js` version 14.18.3+

For the latest updates see the [CHANGELOG.md](https://github.com/uhppoted/uhppoted-nodejs/blob/master/CHANGELOG.md)

#### Installation

```
npm install uhppoted
```

### Release Notes

#### Current Release

**[v0.8.9](https://github.com/uhppoted/uhppoted-nodejs/releases/tag/v0.8.9) - 2024-09-06**

1. Added support for TCP connections to controllers.
2. Removed dependency on _ip.js_.


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
- [`setPCControl`](#setpccontrol) enables or disables remote access management
- [`setInterlock`](#setinterlock) sets controller door interlock mode
- [`activateKeypads`](#activatekeypads) activates and deactivates controller reader access keypads
- [`setDoorPasscodes`](#setdoorpasscodes) sets door supervisor passcodes
- [`restoreDefaultParameters`](#restoreDefaultParameters) resets the controller configuration to the manufacturer default settings
- [`listen`](#listen) establishes a listening connection for controller events

Each API call:
- takes a [`context`](#context) _object_ as the first argument
- takes a [`controller`](#controller) argument as the second argument
- takes the function specific parameters 
- returns a `Promise` that resolves to a response.

_NOTE_: `getDevices` is the sole function that does not take a `controller` argument.

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

uhppoted.getDevice(ctx, 405419896)
  .then(response => {
    console.log('\nget-device:\n', response)
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

#### `controller`

The `controller` parameter may be either:
- a _uint32_ value corresponding to the controller serial number (e.g. 405419896)
- a `{ controller, address, protocol }` object, where:
    - `controller` is a _uint32_ value corresponding to the controller serial number
    - `address` is an `address:port` string corresponding to the controller IPv4 address and port or an `{address,port}` object. 
       The `port` is optional and defaults to port 60000 if not specified.
    - `protocol` may be either 'udp' or 'tcp'. The `protocol` is optional and defaults to 'udp' if not specified.

Some examples:
```
getDevice(ctx,405419896)
getDevice(ctx,{ controller:405419896 })
getDevice(ctx,{ controller:405419896, address:'192.168.1.100' })
getDevice(ctx,{ controller:405419896, address:'192.168.1.100:60000' })
getDevice(ctx,{ controller:405419896, address:'192.168.1.100:60000', protocol:'tcp' })
getDevice(ctx,{ controller:405419896, address:{ address:'192.168.1.100' }})
getDevice(ctx,{ controller:405419896, address:{ address:'192.168.1.100', port:60000 }})
getDevice(ctx,{ controller:405419896, address:{ address:'192.168.1.100', port:60000 }, protocol:'tcp'})
```

`{controller, address, protocol }` is required for TCP connections to controllers. The legacy controller ID form only supports 
UDP connections.

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
uhppoted.getDevice(ctx, controller)
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object

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
uhppoted.setIP (ctx, controller, address, netmask, gateway)
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object
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
uhppoted.getTime (ctx, controller)
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object

Returns a `datetime` object, e.g.:
```
{ deviceId: 405419896, datetime: '2021-06-04 14:29:08' }
```

#### `setTime`

Sets the controller date and time.
```
uhppoted.setTime (ctx, controller, datetime)
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object
- `datetime`: YYYY-mm-dd HH:mm:ss

Returns a `datetime` object, e.g.:
```
{ deviceId: 405419896, datetime: '2021-06-04 14:29:08' }
```

#### `getDoorControl`

Retrieves the controller door delay and control mode for a door.
```
uhppoted.getDoorControl (ctx, controller, door)
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object
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
uhppoted.setDoorControl (ctx, controller, door, delay, mode)
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object
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
uhppoted.getListener (ctx, controller) 
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object

Returns a `listener` object, e.g.:
```
{ deviceId: 405419896, address: '192.168.1.100', port: 60001, interval: 15 }
```

#### `setListener`

Sets the host:port IP address to which controller events are sent.
```
uhppoted.setListener (ctx, controller, address, port) 
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object
- `address`: IPv4 address of event listener
- `port`: UDP port on which event listener is expecting events
- `interval`: Auto-send interval. Sets the interval ([0..255] seconds) at which the controller sends the
              current status and most recent event. A zero interval disables auto-send.

Returns an `updated` result object, e.g.:
```
{ deviceId: 405419896, updated: true }
```

#### `recordSpecialEvents`

Enables or disables door open and close input events.

```
uhppoted.recordSpecialEvents (ctx, controller, enable)
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object
- `enable`: enables door open and closed events if _true_

Returns an `updated` result object, e.g.:
```
{ deviceId: 405419896, updated: true }
```

#### `getStatus`

Retrieves a controller status.

```
uhppoted.getStatus (ctx, controller)
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object

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

_Notes:_
1. The event field will contain only the index field (0) if the response does not contain an event.
2. The event timestamp field will be blank if the event timestamp in the response is a _zero value_.


#### `getCards`

Retrieves the number of card records stored on a controller. The returned may include
deleted records.

```
uhppoted.getCards (ctx, controller)
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object

Returns the a `cards` object, e.g.:
```
{ deviceId: 405419896, cards: 37 }
```

#### `getCard`

Retrieves a single card record from a controller.

```
uhppoted.getCard (ctx, controller, cardNumber) 
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object
- `cardNumber`: card number

Returns the card record for the card number, e.g.:
```
{
  deviceId: 405419896,
  card: {
    number: 10058400,
    valid: { from: '2023-01-01', to: '2023-12-31' },
    doors: { '1': true, '2': false, '3': false, '4': true }
    PIN: 0
  }
}
```

#### `getCardByIndex`

Retrieves a single card record from a controller by record number.

```
uhppoted.getCardByIndex (ctx, controller, index)
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object
- `index`: record index of card

Returns the card record at the index, e.g.:
```
{
  deviceId: 405419896,
  card: {
    number: 10058400,
    valid: { from: '2023-01-01', to: '2023-12-31' },
    doors: { '1': false, '2': false, '3': false, '4': false },
    PIN: 0
  }
}
```

_Notes:_
1. A card number of 0 is returned if the card at the index does not exist.
2. A card number of 0xffffffff (4294967295) is returned if the card at the index has been deleted.
   (e.g. [see examples/get-card-by-index.js](https://github.com/uhppoted/uhppoted-nodejs/blob/main/examples/get-card-by-index.js))


#### `putCard`

Adds or updates a single card record on a controller.

```
uhppoted.putCard (ctx, controller, cardNumber, validFrom, validUntil, doors)
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object
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
uhppoted.deleteCard (ctx, controller, cardNumber)
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object
- `cardNumber`: card number

Returns a `deleted` result object, e.g.:
```
{ deviceId: 405419896, deleted: true }
```

#### `deleteCards`

Deletes all card records stored on a controller.

```
uhppoted.deleteCards (ctx, controller) 
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object

Returns a `deleted` result object, e.g.:
```
{ deviceId: 405419896, deleted: true }
```

#### `getTimeProfile`

Retrieves a time profile from a controller.

```
uhppoted.getTimeProfile (ctx, controller, profileId) 
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object
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
uhppoted.setTimeProfile (ctx, controller, profile) 
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object
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
uhppoted.clearTimeProfiles (ctx, controller) 
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object

Returns a `cleared` result object, e.g.:
```
{ deviceId: 405419896, cleared: true }
```

#### `clearTaskList`

Clears the task list on controller.

```
uhppoted.clearTaskList (ctx, controller) 
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object

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
uhppoted.addTask (ctx, controller, task) 
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object
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
uhppoted.refreshTaskList (ctx, controller) 
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object

Returns a `refreshed` result object, e.g.:
```
{ deviceId: 405419896, refreshed: true }
```

#### `getEvents`

Retrieves the indices of the first and last event records stored on a controller.

```
uhppoted.getEvents (ctx, controller)
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object
- `index`: index of event (1-100000)

Returns an `events` record, e.g.:
```
{ deviceId: 405419896, first: 1, last: 70 }
```

#### `getEvent`

Retrieves a single event from a controller.

```
uhppoted.getEvent (ctx, controller, index)
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object
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
_Notes_: 
1. The event timestamp field will be blank if the event timestamp in the response is a _zero value_.


#### `getEventIndex`

Retrieves the current event index user value from a controller.

```
uhppoted.getEventIndex (ctx, controller)
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object

Returns an `event-index` object, e.g.:
```
{ deviceId: 405419896, index: 29 }
```

#### `setEventIndex`

Sets the current event index user value on a controller.

```
uhppoted.setEventIndex (ctx, controller, index)
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object
- `index`: 1-100000

Returns an `updated` result object, e.g.:
```
{ deviceId: 405419896, updated: true }
```

#### `openDoor`

Remotely unlocks a door.

```
uhppoted.openDoor (ctx, controller, door)
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object
- `door`: 1-4

Returns an `opened` result object, e.g.
```
{ deviceId: 405419896, opened: true }
```

#### `setPCControl`

Enables or disables remote host access control.

When remote host access control is enabled, the controller defers access control decisions to
the host - the remote host is expected to listen for card swipe events and open the associated
door after verifying the card access permissions. 

The controller will revert to local access control if it hasn't received any communication from
the host within the last 30 seconds (any command is sufficient - a `setPCControl` command is not
required), but will reassert remote access control mode on receipt of any subsequent message from
the host.

Remote access control mode is not volatile and persists across controller restarts.

```
uhppoted.setPCControl (ctx, controller, enable)
```
- `controller`: serial number of controller or [`{controller,address,protocol}`](#controller) object
- `enable`: enables remote host access control if _true_

Returns an `ok` result object, e.g.:
```
{ deviceId: 405419896, ok: true }
```


#### `setInterlock`

Sets the controller door interlock mode.

The door interlock prevents a door from opening unless the interlock condition is valid for that door. The
controllers support the following modes:

| Mode        | Description                                                                                                      |
|-------------|------------------------------------------------------------------------------------------------------------------|
| 0 (none)    | Any door can opened subject to access restrictions                                                               |
| 1 (1&2)     | Door 1 can be opened if door 2 is closed and vice versa                                                          |
| 2 (3&4)     | Door 3 can be opened if door 4 is closed and vice versa                                                          |
| 3 (1&2,3&4) | Door 1 can be opened if door 2 is closed and vice versa, Door 3 can be opened if door 4 is closed and vice versa |
| 4 (1&2&3)   | Door 1 can be opened if 2 and 3 are both closed, door 2 if 1 and 3 are closed and door 3 if 1 and 2 are closed   |
| 8 (1&2&3&4) | A door can only be opened if all the other doors are closed                                                      |


```
uhppoted.setInterlock (ctx, controller, 3)
```
- `deviceId`:  serial number of controller
- `interlock`: 0,1,2,3,4 or 8

Returns an `ok` result object, e.g.:
```
{ deviceId: 405419896, ok: true }
```


#### `activateKeypads`

Activates and deactivates controller reader access keypads. The controller does not provide the functionality
to activate or deactivate keypads individually so any keypads not explicitly listed as _activated_ will be
deactivated.

```
uhppoted.activateKeypads (ctx, controller, keypads)
```
- `deviceId`:  serial number of controller
- `keypads`: {
                1: true/false,
                2: true/false,
                3: true/false,
                4: true/false
             }

Returns an `ok` result object, e.g.:
```
{ deviceId: 405419896, ok: true }
```


#### `setDoorPasscodes`

Assigns up to four passcodes for supervisor access to a door.

```
uhppoted.setDoorPasscodes (ctx, controller, door, passcodes)
```
- `deviceId`:  serial number of controller
- `door`: door ID [1..4]
- `passcodes`: array of up to 4 passcodes in the range [0..999999] (0 corresponds to 'no code')

Returns an `ok` result object, e.g.:
```
{ deviceId: 405419896, ok: true }
```


#### `restoreDefaultParameters`

Resets the controller configuration to the manufacturer default settings.

```
uhppoted.restoreDefaultParameters (ctx, controller)
```
- `deviceId`:  serial number of controller

Returns an `ok` result object, e.g.:
```
{ deviceId: 405419896, ok: true }
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
