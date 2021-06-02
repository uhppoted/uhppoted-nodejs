const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')
const validate = require('../src/common.js').validate
const initialise = require('../src/common.js').initialise

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
        config: new uhppoted.Config('examples', '192.168.1.100', '192.168.1.255:60000', '192.168.1.100:60001', 5000, [], false)
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
        config: new uhppoted.Config('examples', '192.168.1.100', '192.168.1.255:60000', '192.168.1.100:60001', 5000, [], false),
        locale: 'klingon'
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
      const ctx = {
        config: new uhppoted.Config('examples', '192.168.1.100', '192.168.1.255:60000', '192.168.1.100:60001', 5000, [], false),
        locale: 'klingon',
        logger: function log (msg) { console.log('TEST: ', msg) }
      }

      return initialise(ctx)
        .then((context) => {
          expect(context.config).to.deep.equal(ctx.config)
          expect(context.locale).to.equal('klingon')
          expect(context.logger.toString()).to.deep.equal("function log (msg) { console.log('TEST: ', msg) }")
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })
  })
})

describe('validate', function () {
  describe('#validate({deviceID...})', function () {
    it('should fail with invalid device ID (0)', function () {
      return validate({ deviceId: 0 })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid device ID '0'")
        })
    })

    it('should succeed with valid device ID (1)', function () {
      return validate({ deviceId: 1 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should succeed with valid device ID (4294967295)', function () {
      return validate({ deviceId: 4294967295 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should fail with invalid device ID (4294967296)', function () {
      return validate({ deviceId: 4294967296 })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid device ID '4294967296'")
        })
    })
  })

  describe('#validate({cardNumber...})', function () {
    it('should fail with invalid card number (0)', function () {
      return validate({ deviceId: 405419896, cardNumber: 0 })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid card number '0'")
        })
    })

    it('should succeed with valid card number (1)', function () {
      return validate({ deviceId: 405419896, cardNumber: 1 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should succeed with valid card number (4294967295)', function () {
      return validate({ deviceId: 405419896, cardNumber: 4294967295 })
        .then(() => {
        })
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

  describe('#validate({cardIndex...})', function () {
    it('should fail with invalid card index (0)', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 0 })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid card index '0'")
        })
    })

    it('should succeed with valid card index (1)', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 1 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should succeed with valid card index (4294967295)', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 4294967295 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should fail with invalid card index (4294967296)', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 4294967296 })
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
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 29, door: 0 })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid door '0'")
        })
    })

    it('should succeed with valid door (1)', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 29, door: 1 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should succeed with valid door (4)', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 29, door: 4 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should fail with invalid door (5)', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 29, door: 5 })
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
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 29, door: 3, eventIndex: 0 })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid event index '0'")
        })
    })

    it('should succeed with valid event index (1)', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 29, door: 3, eventIndex: 1 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should succeed with valid event index (4294967295)', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 29, door: 3, eventIndex: 4294967295 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should fail with invalid card index (4294967296)', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 29, door: 3, eventIndex: 4294967296 })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid event index '4294967296'")
        })
    })
  })
})
