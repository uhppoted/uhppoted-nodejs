const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const translate = require('../src/internationalisation.js').translate

describe('internationalisation', function () {
  describe('#translate(...)', function () {
    it('default translation should translate swipe event type to en-US', function () {
      const expected = { swipe: '** card swipe **' }
      const object = { swipe: '** {{card swipe}} **' }

      const translated = translate(object)

      expect(translated).to.deep.equal(expected)
    })
  })

  describe('#translate(...)', function () {
    it('en-US locale should translate swipe event type to en-US', function () {
      const expected = { swipe: '** card swipe **' }
      const object = { swipe: '** {{card swipe}} **' }

      const translated = translate(object, 'en-US')

      expect(translated).to.deep.equal(expected)
    })
  })

  describe('#translate(...)', function () {
    it('klingon locale should translate swipe event type to klingon', function () {
      const expected = { swipe: '** chevjaq **' }
      const object = { swipe: '** {{card swipe}} **' }

      const translated = translate(object, 'klingon')

      expect(translated).to.deep.equal(expected)
    })
  })

  describe('#translate(...)', function () {
    it('unsupported locale should translate swipe event type to en-US', function () {
      const expected = { swipe: '** card swipe **' }
      const object = { swipe: '** {{card swipe}} **' }

      const translated = translate(object, 'ahdlfhauawroiuawbalsfjhbasuyeabdhbffy')

      expect(translated).to.deep.equal(expected)
    })
  })

  it('unrecognised token should translate as token content', function () {
    const expected = { swipe: '** qwerty uiop **' }
    const object = { swipe: '** {{qwerty uiop}} **' }

    const translated = translate(object)

    expect(translated).to.deep.equal(expected)
  })
})
