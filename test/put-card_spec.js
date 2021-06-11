const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('put-card', function () {
  describe('#put-card with invalid parameters', function () {
    it('should fail with invalid device ID', function () {
      return uhppoted.putCard({}, 0, 8165538, '2021-01-01', '2021-12-31', { 1: true, 2: false, 3: true, 4: true })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid device ID '0'")
        })
    })

    it('should fail with invalid card number', function () {
      return uhppoted.putCard({}, 405419896, 0, '2021-01-01', '2021-12-31', { 1: true, 2: false, 3: true, 4: true })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid card number '0'")
        })
    })

    it('should fail with invalid time profile', function () {
      return uhppoted.putCard({}, 405419896, 8112345, '2021-01-01', '2021-12-31', { 1: true, 2: false, 3: 0, 4: true })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal('invalid time profile for door 3 (0)')
        })
    })

    it('should fail with invalid time profile', function () {
      return uhppoted.putCard({}, 405419896, 8112345, '2021-01-01', '2021-12-31', { 1: true, 2: false, 3: 1, 4: true })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal('invalid time profile for door 3 (1)')
        })
    })

    it('should fail with invalid time profile', function () {
      return uhppoted.putCard({}, 405419896, 8112345, '2021-01-01', '2021-12-31', { 1: true, 2: false, 3: 255, 4: true })
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal('invalid time profile for door 3 (255)')
        })
    })
  })
})
