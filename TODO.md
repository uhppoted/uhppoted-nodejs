# TODO

- [ ] TCP/IP protocol (cf. https://github.com/uhppoted/uhppote-core/issues/17)
      - [x] ~~FIXME in internationalisation~~
      - [x] TCP send/receive
      - [x] TCP timeout
      - [x] Optional dest and protocol arguments
      - [x] Examples
      - [x] Update unit tests
      - [ ] Unit tests for `resolve` address
            - [ ] `null`
            - [ ] ``
            - [ ] `    `
            - [ ] string (address)
            - [ ] string (address:port)
            - [ ] object {address}
            - [ ] object {address,port}
      - [ ] Integration tests
            - [ ] get-device
            - [ ] set-ip
            - [ ] get-listener
            - [ ] set-listener
            - [ ] get-time
            - [ ] set-time
            - [ ] get-door-control
            - [ ] set-door-control
            - [ ] record-special-events
            - [ ] get-status
            - [ ] get-cards
            - [ ] get-card
            - [ ] get-card-by-index
            - [ ] put-card
            - [ ] delete-card
            - [ ] delete-cards
            - [ ] get-time-profile
            - [ ] set-time-profile
            - [ ] clear-timeprofiles
            - [ ] clear-tasklist
            - [ ] add-task
            - [ ] refresh-tasklist
            - [ ] get-events
            - [ ] get-event
            - [ ] get-event-index
            - [ ] set-event-index
            - [ ] open-door
            - [ ] set-pc-control
            - [ ] set-interlock
            - [ ] activate-keypads
            - [ ] set-door-passcodes
            - [ ] restore-default-parameters
      - [ ] documentation
      - [x] CHANGELOG
      - [ ] README

## TODO

1. Device by name

## NOTES

1. `workflow_dispatch` is broken in _github_ workflows when the workflows are in multiple
    branches (https://github.community/t/workflow-dispatch-workflow-not-showing-in-actions-tab/130088/27)
