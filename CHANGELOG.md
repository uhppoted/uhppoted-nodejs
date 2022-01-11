### v0.7.2: Minor bug fixes

1. Throws an error if `get-event` retrieves an event that has been overwritten
   (cf. https://github.com/uhppoted/uhppote-cli/issues/7)


### v0.7.1: Added support for scheduled tasks

1. New functions:
   - `clearTaskList`
   - `addTask`
   - `refreshTaskList`


### v0.7.0: Added support for time profiles

1. Implemented:
   - `getTimeProfile`
   - `setTimeProfile`
   - `clearTimeProfiles`

2. Updated `putCard` to support time profiles
3. Updated `getCard` to support time profiles
4. Updated `getCardByIndex` to support time profiles
5. Reorganised README to (hopefully) make it more usable


### v0.6.13: Initial release

1. Initial API implementation for interacting with the UHPPOTE Wiegand TCP/IP access control boards.


