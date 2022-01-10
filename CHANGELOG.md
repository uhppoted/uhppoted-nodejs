### v0.7.2: Revised event handling

1. `get-event` now throws 'overwritten error' if the `event type` in the reply
    from the controller is `0xff`. This happens when the requested event index 
    is less than the index of the first stored event.


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


