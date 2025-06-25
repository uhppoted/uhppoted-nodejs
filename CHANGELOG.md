# CHANGELOG

## Unreleased

### Added
1. `get/set-antipassback` API function to manage the controller anti-passback mode.

### Updated
1. Added check to prevent UDP broadcast-to-self


## [0.8.10](https://github.com/uhppoted/uhppoted-nodejs/releases/tag/v0.8.10) - 2024-01-29

### Updated
1. Added the auto-send interval to the _get-listener_ and _set-listener_ API functions.


## [0.8.9](https://github.com/uhppoted/uhppoted-nodejs/releases/tag/v0.8.9) - 2024-09-06

### Added
1. Added support for TCP connections to controllers.

### Updated
1. Removed dependency on _ip.js_.

## [0.8.8](https://github.com/uhppoted/uhppoted-nodejs/releases/tag/v0.8.8) - 2024-03-26

### Added
1. `restore-default-parameters` function to reset the controller configuration to the manufacturer
   defaults.

### Updated
2. Removed support for 14.18.3.

## [0.8.7](https://github.com/uhppoted/uhppoted-nodejs/releases/tag/v0.8.7) - 2023-12-01

### Added
1. `set-door-passcodes` function to set the supervisor access passcodes for a door.

### Updated
1. Reworked `get-status` to explicitly handle response without an event.
2. Reworked `get-status` and `get-event` to return blank timestamp when response timestamp
   is a _zero value_.


## [0.8.6](https://github.com/uhppoted/uhppoted-nodejs/releases/tag/v0.8.6) - 2023-08-30

### Added
1. `activate-keypads` function to activate/deactivate controller reader access keypads.

### Updated
1. Added a note to the README for the card numbers returned by `get-card-by-index` for 
   cards that do not exist or cards that were deleted.
2. Added get-all-cards example.
3. Added get-all-cards-paged example.


## [0.8.5](https://github.com/uhppoted/uhppoted-nodejs/releases/tag/v0.8.5) - 2023-06-13

### Added
1. `set-interlock` command to set controller door interlock mode.


## [0.8.4](https://github.com/uhppoted/uhppoted-nodejs/releases/tag/v0.8.4) - 2023-03-17

### Added
1. `set-pc-control` command to enabled/disable remote access management.


## [0.8.3](https://github.com/uhppoted/uhppoted-nodejs/releases/tag/v0.8.3) - 2022-12-16

1. Maintenance release for version compatibility.


## [0.8.2](https://github.com/uhppoted/uhppoted-nodejs/releases/tag/v0.8.2) - 2022-10-14

### Changed
1. Added 'swipe open' and 'swipe close' event reasons.


## [0.8.1](https://github.com/uhppoted/uhppoted-nodejs/releases/tag/v0.8.1) - 2022-08-01

### Changed
1. Maintenance release to update dependencies.


## [0.8.0](https://github.com/uhppoted/uhppoted-nodejs/releases/tag/v0.8.0)

### Changed
1. Updated dependencies for security fixes.


## [0.7.3](https://github.com/uhppoted/uhppoted-nodejs/releases/tag/v0.7.3)

### Changed
1. Updated dependencies for security fixes.


## [0.7.2](https://github.com/uhppoted/uhppoted-nodejs/releases/tag/v0.7.2)

### Changed
1. Downgraded required NodeJS engine from 15.x.x to 14.18.3 LTS (Fermium)
   (cf. https://github.com/uhppoted/uhppoted-nodejs/issues/5)

2. Updated github workflow to build against
   - NodeJS v14.18.3 LTS (Fermium)
   - NodeJS v16.13.2 LTS (Gallium)

3. Throws an error if `get-event` retrieves an event that has been overwritten
   (cf. https://github.com/uhppoted/uhppote-cli/issues/7).

4. Throws an error if `get-event` retrieves an event with an index that does not
   exist.


## [0.7.1](https://github.com/uhppoted/uhppoted-nodejs/releases/tag/v0.7.1)

### Changed
1. Added support for scheduled tasks:
   - `clearTaskList`
   - `addTask`
   - `refreshTaskList`


## [0.7.0](https://github.com/uhppoted/uhppoted-nodejs/releases/tag/v0.7.0) 

### Changed
1. Added support for time profiles:
   - `getTimeProfile`
   - `setTimeProfile`
   - `clearTimeProfiles`

2. Updated `putCard` to support time profiles
3. Updated `getCard` to support time profiles
4. Updated `getCardByIndex` to support time profiles
5. Reorganised README to (hopefully) make it more usable


## [0.6.13](https://github.com/uhppoted/uhppoted-nodejs/releases/tag/v0.6.13) 

### Added
1. Initial API implementation for interacting with the UHPPOTE Wiegand TCP/IP access control boards.


