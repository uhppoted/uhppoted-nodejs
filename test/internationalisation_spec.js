const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const translate = require('../src/internationalisation.js').translate

describe('internationalisation', function () {
  // swipe
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

  // swipe open
  describe('#translate(...)', function () {
    it('default translation should translate "swipe open" event type to en-US', function () {
      const expected = { swipe: '** swipe open **' }
      const object = { swipe: '** {{swipe open}} **' }

      const translated = translate(object)

      expect(translated).to.deep.equal(expected)
    })
  })

  describe('#translate(...)', function () {
    it('en-US locale should translate "swipe open" event type to en-US', function () {
      const expected = { swipe: '** swipe open **' }
      const object = { swipe: '** {{swipe open}} **' }

      const translated = translate(object, 'en-US')

      expect(translated).to.deep.equal(expected)
    })
  })

  describe('#translate(...)', function () {
    it('klingon locale should translate "swipe open" event type to klingon', function () {
      const expected = { swipe: '** ghIt **' }
      const object = { swipe: '** {{swipe open}} **' }

      const translated = translate(object, 'klingon')

      expect(translated).to.deep.equal(expected)
    })
  })

  describe('#translate(...)', function () {
    it('unsupported locale should translate "swipe open" event type to en-US', function () {
      const expected = { swipe: '** swipe open **' }
      const object = { swipe: '** {{swipe open}} **' }

      const translated = translate(object, 'ahdlfhauawroiuawbalsfjhbasuyeabdhbffy')

      expect(translated).to.deep.equal(expected)
    })
  })

  // swipe close
  describe('#translate(...)', function () {
    it('default translation should translate "swipe close" event type to en-US', function () {
      const expected = { swipe: '** swipe close **' }
      const object = { swipe: '** {{swipe close}} **' }

      const translated = translate(object)

      expect(translated).to.deep.equal(expected)
    })
  })

  describe('#translate(...)', function () {
    it('en-US locale should translate "swipe close" event type to en-US', function () {
      const expected = { swipe: '** swipe close **' }
      const object = { swipe: '** {{swipe close}} **' }

      const translated = translate(object, 'en-US')

      expect(translated).to.deep.equal(expected)
    })
  })

  describe('#translate(...)', function () {
    it('klingon locale should translate "swipe close" event type to klingon', function () {
      const expected = { swipe: '** qoD **' }
      const object = { swipe: '** {{swipe close}} **' }

      const translated = translate(object, 'klingon')

      expect(translated).to.deep.equal(expected)
    })
  })

  describe('#translate(...)', function () {
    it('unsupported locale should translate "swipe open" event type to en-US', function () {
      const expected = { swipe: '** swipe close **' }
      const object = { swipe: '** {{swipe close}} **' }

      const translated = translate(object, 'ahdlfhauawroiuawbalsfjhbasuyeabdhbffy')

      expect(translated).to.deep.equal(expected)
    })
  })

  // unknown
  it('unrecognised token should translate as token content', function () {
    const expected = { swipe: '** qwerty uiop **' }
    const object = { swipe: '** {{qwerty uiop}} **' }

    const translated = translate(object)

    expect(translated).to.deep.equal(expected)
  })
})
