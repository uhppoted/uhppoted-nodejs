const describe = require('mocha').describe
const it = require('mocha').it
const assert = require('chai').assert
const expect = require('chai').expect
const uhppoted = require('../index.js')

describe('add-task', function () {
  describe('#add-task with invalid parameters', function () {
    it('should fail with invalid controller ID', function () {
      const task = {
        task: 5,
        door: 3,
        valid: { from: '2021-01-01', to: '2021-12-31' },
        weekdays: ['Monday', 'Wednesday', 'Friday'],
        start: '08:30',
        cards: 3
      }

      return uhppoted.addTask({}, 0, task)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })

    it('should fail with invalid controller ID', function () {
      const task = {
        task: 5,
        door: 3,
        valid: { from: '2021-01-01', to: '2021-12-31' },
        weekdays: ['Monday', 'Wednesday', 'Friday'],
        start: '08:30',
        cards: 3
      }

      return uhppoted.addTask({}, { id: 0, address: '192.168.1.125', protocol: 'tcp' }, task)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid controller ID '0'")
        })
    })

    it('should fail with invalid task type', function () {
      const task = {
        task: 0,
        door: 3,
        valid: { from: '2021-01-01', to: '2021-12-31' },
        weekdays: ['Monday', 'Wednesday', 'Friday'],
        start: '08:30',
        cards: 3
      }

      return uhppoted.addTask({}, 405419896, task)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid task type '0'")
        })
    })

    it('should fail with invalid task type', function () {
      const task = {
        task: 14,
        door: 3,
        valid: { from: '2021-01-01', to: '2021-12-31' },
        weekdays: ['Monday', 'Wednesday', 'Friday'],
        start: '08:30',
        cards: 3
      }

      return uhppoted.addTask({}, 405419896, task)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid task type '14'")
        })
    })

    it('should fail with invalid task type', function () {
      const task = {
        task: 'qwerty',
        door: 3,
        valid: { from: '2021-01-01', to: '2021-12-31' },
        weekdays: ['Monday', 'Wednesday', 'Friday'],
        start: '08:30',
        cards: 3
      }

      return uhppoted.addTask({}, 405419896, task)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid task type 'qwerty'")
        })
    })

    it('should fail with invalid door', function () {
      const task = {
        task: 'enable time profile',
        door: 0,
        valid: { from: '2021-01-01', to: '2021-12-31' },
        weekdays: ['Monday', 'Wednesday', 'Friday'],
        start: '08:30',
        cards: 3
      }

      return uhppoted.addTask({}, 405419896, task)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid door '0'")
        })
    })

    it('should fail with invalid door', function () {
      const task = {
        task: 'enable time profile',
        door: 5,
        valid: { from: '2021-01-01', to: '2021-12-31' },
        weekdays: ['Monday', 'Wednesday', 'Friday'],
        start: '08:30',
        cards: 3
      }

      return uhppoted.addTask({}, 405419896, task)
        .then(() => {
          assert.fail()
        })
        .catch((err) => {
          expect(err.message).to.equal("invalid door '5'")
        })
    })
  })
})
