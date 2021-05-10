# uhppoted-nodejs

**IN DEVELOPMENT**

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
| `timeout`     | Request execution timeout (in milliseconds)    | `5000`            |
| `bind`        | UDP `address` to bind to for requests          | `0.0.0.0`         |
| `broadcast`   | UDP `address` for broadcast requests           | `255.255.255.255` |
| `listen`      | UDP address:port on which to listen for events | `0.0.0.0:60000`   |
| `controllers` | List of controller specific IPv4 address:port overrides for systems where a controller is either not located on the same LAN (i.e. cannot receive or respond to UDP broadcasts) or where directed UDP messages are preferred. | `(none)` |
| `debug`      | Enables logging of request/response messages to the console | `false` |

### Examples

### Issues and Feature Requests

Please create an issue in the [uhppoted-nodejs](https://github.com/uhppoted/uhppoted-nodejs) _github_ repository.

### License

[MIT](https://github.com/uhppoted/uhppoted-nodejs/blob/master/LICENSE)
