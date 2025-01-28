const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')
const validate = require('../src/common.js').validate
const initialise = require('../src/common.js').initialise
const resolve = require('../src/common.js').resolve

describe('initialise', function () {
  describe('#initialise({})', function () {
    it('should build a valid uhppoted context from a minimal CTX object', function () {
      return initialise({})
        .then((context) => {
          expect(context.config).to.deep.equal(new uhppoted.Config())
          expect(context.locale).to.equal('en-US')
          expect(context.logger.toString()).to.deep.equal('(m) => { log(m) }')
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })
  })

  describe('#initialise(ctx)', function () {
    it('should build a valid uhppoted context from a CTX object with just a config', function () {
      const ctx = {
        config: new uhppoted.Config(
          'examples',
          '192.168.1.100',
          '192.168.1.255:60000',
          '192.168.1.100:60001',
          5000,
          [],
          false,
        ),
      }

      return initialise(ctx)
        .then((context) => {
          expect(context.config).to.deep.equal(ctx.config)
          expect(context.locale).to.equal('en-US')
          expect(context.logger.toString()).to.deep.equal('(m) => { log(m) }')
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })
  })

  describe('#initialise(ctx)', function () {
    it('should build a valid uhppoted context from a CTX object with a config and locale', function () {
      const ctx = {
        config: new uhppoted.Config(
          'examples',
          '192.168.1.100',
          '192.168.1.255:60000',
          '192.168.1.100:60001',
          5000,
          [],
          false,
        ),
        locale: 'klingon',
      }

      return initialise(ctx)
        .then((context) => {
          expect(context.config).to.deep.equal(ctx.config)
          expect(context.locale).to.equal('klingon')
          expect(context.logger.toString()).to.deep.equal('(m) => { log(m) }')
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })
  })

  describe('#initialise(ctx)', function () {
    it('should build a valid uhppoted context from a CTX object with a config, locale and logger', function () {
      // prettier-ignore
      const ctx = {
        config: new uhppoted.Config('examples', '192.168.1.100', '192.168.1.255:60000', '192.168.1.100:60001', 5000, [], false),
        locale: 'klingon',
        logger: function log (msg) { console.log('TEST: ', msg) }
      }

      return initialise(ctx)
        .then((context) => {
          expect(context.config).to.deep.equal(ctx.config)
          expect(context.locale).to.equal('klingon')
          expect(context.logger.toString()).to.deep.equal(
            "function log (msg) { console.log('TEST: ', msg) }",
          )
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })
  })
})

describe('validate', function () {
  describe('#validate({controller ID...})', function () {
    it('should fail with invalid controller ID (0)', function () {
      return validate({ controller: 0 })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })

    it('should succeed with valid controller ID (1)', function () {
      return validate({ controller: 1 })
        .then(() => {})
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should succeed with valid controller ID (4294967295)', function () {
      return validate({ controllerId: 4294967295 })
        .then(() => {})
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should fail with invalid controller ID (4294967296)', function () {
      return validate({ controller: 4294967296 })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '4294967296'")
        })
    })
  })

  describe('#validate({cardNumber...})', function () {
    it('should fail with invalid card number (0)', function () {
      return validate({ controller: 405419896, cardNumber: 0 })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid card number '0'")
        })
    })

    it('should succeed with valid card number (1)', function () {
      return validate({ deviceId: 405419896, cardNumber: 1 })
        .then(() => {})
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should succeed with valid card number (4294967295)', function () {
      return validate({ deviceId: 405419896, cardNumber: 4294967295 })
        .then(() => {})
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should fail with an invalid card number (4294967296)', function () {
      return validate({ deviceId: 405419896, cardNumber: 4294967296 })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid card number '4294967296'")
        })
    })
  })

  describe('#validate({PIN...})', function () {
    it('should succeed with valid card keypad PIN (7531)', function () {
      return validate({ deviceId: 405419896, cardNumber: 10058399, PIN: 7531 })
        .then(() => {})
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should succeed with valid card keypad PIN (0)', function () {
      return validate({ deviceId: 405419896, cardNumber: 10058399, PIN: 0 })
        .then(() => {})
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should succeed with valid card keypad PIN (999999)', function () {
      return validate({
        deviceId: 405419896,
        cardNumber: 10058399,
        PIN: 999999,
      })
        .then(() => {})
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should fail with invalid card keypad PIN (1000000)', function () {
      return validate({
        deviceId: 405419896,
        cardNumber: 10058399,
        PIN: 1000000,
      })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal('invalid card keypad PIN 1000000')
        })
    })

    it('should fail with invalid card keypad PIN (-1)', function () {
      return validate({ deviceId: 405419896, cardNumber: 10058399, PIN: -1 })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal('invalid card keypad PIN -1')
        })
    })

    it('should fail with invalid card keypad PIN (qwerty)', function () {
      return validate({
        deviceId: 405419896,
        cardNumber: 10058399,
        PIN: 'qwerty',
      })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal('invalid card keypad PIN qwerty')
        })
    })
  })

  describe('#validate({cardIndex...})', function () {
    it('should fail with invalid card index (0)', function () {
      return validate({
        deviceId: 405419896,
        cardNumber: 8165538,
        cardIndex: 0,
      })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid card index '0'")
        })
    })

    it('should succeed with valid card index (1)', function () {
      return validate({
        deviceId: 405419896,
        cardNumber: 8165538,
        cardIndex: 1,
      })
        .then(() => {})
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should succeed with valid card index (4294967295)', function () {
      return validate({
        deviceId: 405419896,
        cardNumber: 8165538,
        cardIndex: 4294967295,
      })
        .then(() => {})
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should fail with invalid card index (4294967296)', function () {
      return validate({
        deviceId: 405419896,
        cardNumber: 8165538,
        cardIndex: 4294967296,
      })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid card index '4294967296'")
        })
    })
  })

  describe('#validate({door...})', function () {
    it('should fail with invalid door (0)', function () {
      return validate({
        deviceId: 405419896,
        cardNumber: 8165538,
        cardIndex: 29,
        door: 0,
      })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid door '0'")
        })
    })

    it('should succeed with valid door (1)', function () {
      return validate({
        deviceId: 405419896,
        cardNumber: 8165538,
        cardIndex: 29,
        door: 1,
      })
        .then(() => {})
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should succeed with valid door (4)', function () {
      return validate({
        deviceId: 405419896,
        cardNumber: 8165538,
        cardIndex: 29,
        door: 4,
      })
        .then(() => {})
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should fail with invalid door (5)', function () {
      return validate({
        deviceId: 405419896,
        cardNumber: 8165538,
        cardIndex: 29,
        door: 5,
      })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid door '5'")
        })
    })
  })

  describe('#validate({eventIndex...})', function () {
    it('should fail with invalid event index (0)', function () {
      return validate({
        deviceId: 405419896,
        cardNumber: 8165538,
        cardIndex: 29,
        door: 3,
        eventIndex: 0,
      })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid event index '0'")
        })
    })

    it('should succeed with valid event index (1)', function () {
      return validate({
        deviceId: 405419896,
        cardNumber: 8165538,
        cardIndex: 29,
        door: 3,
        eventIndex: 1,
      })
        .then(() => {})
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should succeed with valid event index (4294967295)', function () {
      return validate({
        deviceId: 405419896,
        cardNumber: 8165538,
        cardIndex: 29,
        door: 3,
        eventIndex: 4294967295,
      })
        .then(() => {})
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should fail with invalid card index (4294967296)', function () {
      return validate({
        deviceId: 405419896,
        cardNumber: 8165538,
        cardIndex: 29,
        door: 3,
        eventIndex: 4294967296,
      })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid event index '4294967296'")
        })
    })
  })
})

describe('resolve', function () {
  describe('resolve controller ID', function () {
    it('should resolve a uint32 controller argument', function () {
      const { id, address, protocol } = resolve(405419896)

      expect(id).to.equal(405419896)
      assert.isNull(address)
      expect(protocol).to.equal('udp')
    })

    it('should resolve an object controller ID', function () {
      const { id, _address, _protocol } = resolve({ id: 405419896 })

      expect(id).to.equal(405419896)
    })
  })

  describe('resolve controller address', function () {
    it('should resolve a missing controller address argument', function () {
      const { id, address, protocol } = resolve({
        id: 405419896,
        protocol: 'tcp',
      })

      expect(id).to.equal(405419896)
      assert.isNull(address)
      expect(protocol).to.equal('udp')
    })

    it('should resolve a controller address {address,port} argument', function () {
      const { _id, address, protocol } = resolve({
        address: { address: '192.168.1.100', port: 12345 },
        protocol: 'tcp',
      })

      expect(address).to.deep.equal({ address: '192.168.1.100', port: 12345 })
      expect(protocol).to.equal('tcp')
    })

    it('should resolve a controller {address} argument', function () {
      const { _id, address, protocol } = resolve({
        id: 405419896,
        address: { address: '192.168.1.100' },
        protocol: 'tcp',
      })

      expect(address).to.deep.equal({ address: '192.168.1.100', port: 60000 })
      expect(protocol).to.equal('tcp')
    })

    it('should resolve a controller string address argument', function () {
      const { _id, address, protocol } = resolve({
        id: 405419896,
        address: '192.168.1.100',
        protocol: 'tcp',
      })

      expect(address).to.deep.equal({ address: '192.168.1.100', port: 60000 })
      expect(protocol).to.equal('tcp')
    })

    it('should resolve a controller string address:port argument', function () {
      const { _id, address, protocol } = resolve({
        id: 405419896,
        address: '192.168.1.100:12345',
        protocol: 'tcp',
      })

      expect(address).to.deep.equal({ address: '192.168.1.100', port: 12345 })
      expect(protocol).to.equal('tcp')
    })
  })

  describe('resolve controller protocol', function () {
    it("should resolve a 'udp' controller protocol argument", function () {
      const { _id, _address, protocol } = resolve({
        id: 405419896,
        address: '192.168.1.100',
        protocol: 'udp',
      })

      expect(protocol).to.equal('udp')
    })

    it("should resolve a 'UDP' controller protocol argument", function () {
      const { _id, _address, protocol } = resolve({
        id: 405419896,
        address: '192.168.1.100',
        protocol: 'UDP',
      })

      expect(protocol).to.equal('udp')
    })

    it("should resolve a 'tcp' controller protocol argument", function () {
      const { _id, _address, protocol } = resolve({
        id: 405419896,
        address: '192.168.1.100',
        protocol: 'tcp',
      })

      expect(protocol).to.equal('tcp')
    })

    it("should resolve a 'TCP' controller protocol argument", function () {
      const { _id, _address, protocol } = resolve({
        id: 405419896,
        address: '192.168.1.100',
        protocol: 'TCP',
      })

      expect(protocol).to.equal('tcp')
    })

    it("should resolve a '' controller protocol argument", function () {
      const { _id, _address, protocol } = resolve({
        id: 405419896,
        address: '192.168.1.100',
        protocol: '',
      })

      expect(protocol).to.equal('udp')
    })

    it("should resolve a 'weird' controller protocol argument", function () {
      const { _id, _address, protocol } = resolve({
        id: 405419896,
        address: '192.168.1.100',
        protocol: 'weird',
      })

      expect(protocol).to.equal('udp')
    })

    it('should resolve a missing controller protocol argument', function () {
      const { _id, _address, protocol } = resolve({
        id: 405419896,
        addres: '192.168.1.100',
      })

      expect(protocol).to.equal('udp')
    })

    it('should resolve a null controller protocol argument', function () {
      const { _controller, _address, protocol } = resolve({
        id: 405419896,
        addres: '192.168.1.100',
        protocol: null,
      })

      expect(protocol).to.equal('udp')
    })
  })
})
