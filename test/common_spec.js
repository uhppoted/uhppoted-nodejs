const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const validate = require('../src/common.js').validate

describe('validate', function () {
  describe('#validate({deviceID...})', function () {
    it('should return Promise that rejects with an invalid device ID', function () {
      return validate({ deviceId: 0 })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid device ID '0'")
        })
    })

    it('should return Promise that resolves', function () {
      return validate({ deviceId: 1 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should return Promise that resolves', function () {
      return validate({ deviceId: 4294967295 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should return Promise that rejects with an invalid device ID', function () {
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
    it('should return Promise that rejects with an invalid card number', function () {
      return validate({ deviceId: 405419896, cardNumber: 0 })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid card number '0'")
        })
    })

    it('should return Promise that resolves', function () {
      return validate({ deviceId: 405419896, cardNumber: 1 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should return Promise that resolves', function () {
      return validate({ deviceId: 405419896, cardNumber: 4294967295 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should return Promise that rejects with an invalid card number', function () {
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
    it('should return Promise that rejects with an invalid card index', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 0 })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid card index '0'")
        })
    })

    it('should return Promise that resolves', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 1 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should return Promise that resolves', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 4294967295 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should return Promise that rejects with an invalid card index', function () {
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
    it('should return Promise that rejects with an invalid door', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 29, door: 0 })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid door '0'")
        })
    })

    it('should return Promise that resolves', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 29, door: 1 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should return Promise that resolves', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 29, door: 4 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should return Promise that rejects with an invalid door', function () {
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
    it('should return Promise that rejects with an invalid event index', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 29, door: 3, eventIndex: 0 })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid event index '0'")
        })
    })

    it('should return Promise that resolves', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 29, door: 3, eventIndex: 1 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should return Promise that resolves', function () {
      return validate({ deviceId: 405419896, cardNumber: 8165538, cardIndex: 29, door: 3, eventIndex: 4294967295 })
        .then(() => {
        })
        .catch((err) => {
          assert.fail(err.message)
        })
    })

    it('should return Promise that rejects with an invalid card index', function () {
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
