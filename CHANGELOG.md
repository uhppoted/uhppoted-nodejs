### v0.7.3: Update dependencies

1. Updated dependencies for security fixes.

### v0.7.2: Downgrade NodeJS engine requirement to 14.18.3 LTS (Fermium)

1. Downgraded required NodeJS engine from 15.x.x to 14.18.3 LTS (Fermium)
   (cf. https://github.com/uhppoted/uhppoted-nodejs/issues/5)

2. Updated github workflow to build against
   - NodeJS v14.18.3 LTS (Fermium)
   - NodeJS v16.13.2 LTS (Gallium)

3. Throws an error if `get-event` retrieves an event that has been overwritten
   (cf. https://github.com/uhppoted/uhppote-cli/issues/7).

4. Throws an error if `get-event` retrieves an event with an index that does not
   exist.


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


