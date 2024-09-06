# TODO

- [x] event listener: add listen auto-send interval (cf. https://github.com/uhppoted/uhppote-core/issues/21)
      - [x] set-event-listener
      - [x] get-event-listener
      - [x] jsdoc
      - [x] CHANGELOG
      - [x]  README

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
