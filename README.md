# uhppoted-nodejs

NodeJS module that implements an API for interacting with a UHPPOTE TCP/IP Wiegand access controller board. The API supports device and card management as well as handling for events.

#### Requirements:
- `node.js` version 14.7.4+
- `ip.js` version 1.1.5+ 

For the latest updates see the [CHANGELOG.md](https://github.com/uhppoted/uhppoted-nodejs/blob/master/CHANGELOG.md)

#### Installation

### API

Each API call takes a `context` _object_ as the first argument, comprising:
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


#### `getDevice`

Retrieves the information for a single access controller.
```
uhppoted.getDevice(ctx, deviceId)
```
- `deviceId`: serial number of controller


#### `setIP`

Sets the controller IP address, net mask and gateway address.
```
uhppoted.setIP (ctx, deviceId, address, netmask, gateway)
```
- `deviceId`: serial number of controller
- `address`: IPv4 address of controller
- `netmask`: IPv4 subnet mask of controller
- `gateway`: IPv4 address of the LAN gateway


#### `getTime`

Retrieves the current controller date and time.
```
uhppoted.getTime (ctx, deviceId)
```
- `deviceId`: serial number of controller


#### `setTime`

Sets the controller date and time.
```
uhppoted.setTime (ctx, deviceId, datetime)
```
- `deviceId`: serial number of controller
- `datetime`: YYYY-mm-dd HH:mm:ss


#### `getDoorControl`

Retrieves the controller door delay and control mode for a door.
```
uhppoted.getDoorControl (ctx, deviceId, door)
```
- `deviceId`: serial number of controller
- `door`: 1-4

#### `setDoorControl`

Sets the delay and control mode for a door.
```
uhppoted.setDoorControl (ctx, deviceId, door, delay, mode)
```
- `deviceId`: serial number of controller
- `door`: 1-4
- `delay`: seconds
- `mode`: _normally open_, _normally closed_ or _controlled_


#### `getListener`

Retrieves the host:port IP address to which controller events are sent.

```
uhppoted.getListener (ctx, deviceId) 
- `deviceId`: serial number of controller
```


#### `setListener`

Sets the host:port IP address to which controller events are sent.
```
uhppoted.setListener (ctx, deviceId, address, port) 
```
- `deviceId`: serial number of controller
- `address`: IPv4 address of event listener
- `port`: UDP port on which event listener is expecting events

#### `getStatus`

Retrieves a controller status.

```
uhppoted.getStatus (ctx, deviceId)
```
- `deviceId`: serial number of controller


#### `getCards`

Retrieves the number of card records stored on a controller. The returned may include
deleted records.

```
uhppoted.getCards (ctx, deviceId)
```
- `deviceId`: serial number of controller


#### `deleteCards`

Deletes all card records stored on a controller.

```
uhppoted.deleteCards (ctx, deviceId) 
```
- `deviceId`: serial number of controller


#### `getCard`

Retrieves a single card record from a controller.

```
uhppoted.getCard (ctx, deviceId, cardNumber) 
```
- `deviceId`: serial number of controller
- `cardNumber`: card number

#### `getCardByIndex`

Retrieves a single card record from a controller by record number.

```
uhppoted.getCardByIndex (ctx, deviceId, index)
```
- `deviceId`: serial number of controller
- `index`: record index of card

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

#### `deleteCard`

Deletes a single card record from a controller.

```
uhppoted.deleteCard (ctx, deviceId, cardNumber)
```
- `deviceId`: serial number of controller
- `cardNumber`: card number


#### `openDoor`

Remotely unlocks a door.

```
uhppoted.openDoor (ctx, deviceId, door)
```
- `deviceId`: serial number of controller
- `door`: 1-4


#### `getEvent`

Retrieves a single event from a controller.

```
uhppoted.getEvent (ctx, deviceId, index)
```
- `deviceId`: serial number of controller
- `index`: index of event (1-100000)


#### `getEventIndex`

Retrieves the current event index user value from a controller.

```
uhppoted.getEventIndex (ctx, deviceId)
```
- `deviceId`: serial number of controller


#### `setEventIndex`

Sets the current event index user value on a controller.

```
uhppoted.setEventIndex (ctx, deviceId, index)
```
- `deviceId`: serial number of controller
- `index`: 1-100000


#### `recordSpecialEvents`

Enables or disables door events.

```
uhppoted.recordSpecialEvents (ctx, deviceId, enabled)
```
- `deviceId`: serial number of controller
- `enabled`: enables door open and closed events if _true_

#### `listen`

Establishes a listening connection for controller events.

```
uhppoted.listen (ctx, onEvent, onError)
```
- `onEvent`: function that accepts and processes a received _event_ object
- `onError`: function that accepts and processes an Error object


### Examples

A minimal example showing the usage for each API can be found in the [_examples_](https://github.com/uhppoted/uhppoted-nodejs/tree/master/examples) folder. 

### Issues and Feature Requests

Please create an issue in the [uhppoted-nodejs](https://github.com/uhppoted/uhppoted-nodejs) _github_ repository.

### License

[MIT](https://github.com/uhppoted/uhppoted-nodejs/blob/master/LICENSE)
