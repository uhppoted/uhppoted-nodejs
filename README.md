NodeJS module that implements an API for interacting with a UHPPOTE TCP/IP Wiegand access controller board. The API supports device and card management as well as handling for events.

#### Requirements:
- `node.js` version 14.7.4+
- `ip.js` version 1.1.5+ 

For the latest updates see the [CHANGELOG.md](https://github.com/uhppoted/uhppoted-nodejs/blob/master/CHANGELOG.md)

#### Installation

### API

Each API call takes a `context` _object_ as the first argument, followed by the function specific parameters and returns a `Promise`
that resolves to a response.

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
- `doors`: map of doors to which the card should be allowed access e.g. _{ 1: true, 2: false, 3: true, 4: true }_

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

### Examples

A minimal example showing the usage for each API can be found in the [_examples_](https://github.com/uhppoted/uhppoted-nodejs/tree/master/examples) folder. 

### Issues and Feature Requests

Please create an issue in the [uhppoted-nodejs](https://github.com/uhppoted/uhppoted-nodejs) _github_ repository.

### License

[MIT](https://github.com/uhppoted/uhppoted-nodejs/blob/master/LICENSE)
