# uhppoted-nodejs

NodeJS module that implements an API for interacting with a UHPPOTE TCP/IP Wiegand access controller board. The API supports device and card management as well as handling for events.

#### Requirements:
- `node.js` version 14.7.4+
- `ip.js` version 1.1.5+ 

For the latest updates see the [CHANGELOG.md](https://github.com/uhppoted/uhppoted-nodejs/blob/master/CHANGELOG.md)

#### Installation

##### Configuration

The nodes can (optionally) accept a configuration that overrides the default settings:

|               | Description                                    | Default           |
| ------------- | ---------------------------------------------- | ----------------- |
| `bind`        | UDP `address` to bind to for requests          | `0.0.0.0`         |
| `broadcast`   | UDP `address` for broadcast requests           | `255.255.255.255` |
| `listen`      | UDP address:port on which to listen for events | `0.0.0.0:60000`   |
| `timeout`     | Request execution timeout (in milliseconds)    | `5000`            |
| `controllers` | List of controller specific IPv4 address:port overrides for systems where a controller is either not located on the same LAN (i.e. cannot receive or respond to UDP broadcasts) or where directed UDP messages are preferred. | `(none)` |
| `debug`      | Enables logging of request/response messages to the console | `false` |

### API

#### `getDevices`

Fetches a list of access controllers on the local LAN.
```
uhppoted.getDevices(ctx)
````

#### `getDevice`

Retrieves the information for a single access controller.
```
uhppoted.getDevice(ctx, deviceID)
```

#### `setIP`

Sets the controller IP address, net mask and gateway address.
```
uhppoted.setIP (ctx, deviceId, address, netmask, gateway)
```

#### `getTime`

Retrieves the current controller date and time.
```
uhppoted.getTime (ctx, deviceId)
```

#### `setTime`

Sets the controller date and time.
```
uhppoted.setTime (ctx, deviceId, datetime)
```

#### `getDoorControl`

Retrieves the controller door delay and control mode for a door.
```
uhppoted.getDoorControl (ctx, deviceId, door)
```

#### `setDoorControl`

Sets the delay and control mode for a door.
```
uhppoted.setDoorControl (ctx, deviceId, door, delay, mode)
```

#### `getListener`

Gets the host:port IP address to which controller events are sent.
```
uhppoted.getListener (ctx, deviceId) 
```

#### `setListener`

Sets the host:port IP address to which controller events are sent.
```
uhppoted.setListener (ctx, deviceId, address, port) 
```

#### `getStatus`

Retrieves a controller status.
```
uhppoted.getStatus (ctx, deviceId)
```

#### `getCards`

Retrieves the number of card records stored on a controller. The returned may include
deleted records.
```
uhppoted.getCards (ctx, deviceId)
```

#### `deleteCards`

Deletes all card records stored on a controller.
```
uhppoted.deleteCards (ctx, deviceId) 
```

#### `getCard`

Retrieves a single card record from a controller.
```
uhppoted.getCard (ctx, deviceId, cardNumber) 
```

#### `getCardByIndex`

Retrieves a single card record from a controller by record number.
```
uhppoted.getCardByIndex (ctx, deviceId, index)
```

#### `putCard`

Adds or updates a single card record on a controller.
```
uhppoted.putCard (ctx, deviceId, card, validFrom, validUntil, doors)
```

#### `deleteCard`

Deletes a single card record from a controller.
```
uhppoted.deleteCard (ctx, deviceId, cardNumber)
```

#### `openDoor`

Remotely unlocks a door.
```
uhppoted.openDoor (ctx, deviceId, door)
```

#### `getEvent`

Retrieves a single event from a controller.
```
uhppoted.getEvent (ctx, deviceId, index)
```

#### `getEventIndex`

Retrieves the current event index user value from a controller.
```
uhppoted.getEventIndex (ctx, deviceId)
```

#### `setEventIndex`

Sets the current event index user value on a controller.
```
uhppoted.setEventIndex (ctx, deviceId, index)
```

#### `recordSpecialEvents`

Enables or disables door events.
```
uhppoted.recordSpecialEvents (ctx, deviceId, enable)
```

#### `listen`

Establishes a listening connection for controller events.
```
uhppoted.listen (ctx, onEvent, onError)
```

### Examples

A minimal example showing the usage for each API can be found in the [_examples_](https://github.com/uhppoted/uhppoted-nodejs/tree/master/examples) folder. 

### Issues and Feature Requests

Please create an issue in the [uhppoted-nodejs](https://github.com/uhppoted/uhppoted-nodejs) _github_ repository.

### License

[MIT](https://github.com/uhppoted/uhppoted-nodejs/blob/master/LICENSE)
