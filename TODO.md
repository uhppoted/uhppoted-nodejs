# TODO

- [ ] TCP/IP protocol (cf. https://github.com/uhppoted/uhppote-core/issues/17)
      - [x] ~~FIXME in internationalisation~~
      - [x] TCP send/receive
      - [x] TCP timeout
      - [x] Optional dest and protocol arguments
      - [x] Examples
      - [x] Update unit tests
      - [x] Unit tests for `resolve` address
            - [x] `null`
            - [x] ``
            - [x] `    `
            - [x] string (address)
            - [x] string (address:port)
            - [x] object {address}
            - [x] object {address,port}
      - [ ] Integration tests
            - [x] get-device
            - [x] set-ip
            - [x] get-listener
            - [x] set-listener
            - [x] get-time
            - [x] set-time
            - [x] get-door-control
            - [x] set-door-control
            - [x] record-special-events
            - [x] get-status
            - [x] get-cards
            - [x] get-card
            - [x] get-card-by-index
            - [x] put-card
            - [x] delete-card
            - [x] delete-cards
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




```

describe('#getXXX(...) (TCP)', function () {
  let sock = null

  before(function () {
    sock = setup(request, [reply], 'tcp')
  })

  after(function () {
    teardown(sock)
  })

  it('should execute get-XXX using TCP with address:port object', function (done) {
    const expected = {
    }

    uhppoted.getXXX(ctx, { controller: 405419896, address: { address: '127.0.0.1', port: 59998 }, protocol: 'tcp' })
      .then(response => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch(err => done(err))
  })

  it('should execute get-XXX using TCP with address:port string', function (done) {
    const expected = {
    }

    uhppoted.getXXX(ctx, { controller: 405419896, address: '127.0.0.1:59998', protocol: 'tcp' })
      .then(response => {
        expect(response).to.deep.equal(expected)
        done()
      })
      .catch(err => done(err))
  })
})
```