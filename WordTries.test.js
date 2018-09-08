const expect = require('chai').expect
const WordTries = require('./index.js')

describe('WordTries', () => {
  const testString =
    'We be light, we be life, we be fire. We sing electric flame, we rumble underground wind, we dance heaven!'
  beforeEach(() => {
    testTries = new WordTries(testString, 1)
  })

  it('is a function', () => {
    expect(WordTries).to.be.a('function')
  })

  it('can be called as a constructor, taking a string and a number', () => {
    expect(new WordTries(testString, 1)).to.be.an('object')
  })

  it('has a .get method', () => {
    expect(testTries.get).to.be.a('function')
  })

  describe('.get', () => {
    describe('when called with no args', () => {
      it('returns an array', () => {
        expect(testTries.get()).to.be.an('array')
      })

      it('contains each word in the string passed to the constructor', () => {
        testString.split(/\W/).forEach(word => {
          expect(testTries.get()).to.contain(word.toLowerCase())
        })
      })

      it('contains each word exactly once', () => {
        testString.split(/\W/).forEach(word => {
          expect(testTries.get().filter(w => w === word).length).to.equal(1)
        })
      })

      it('is in order of frequency', () => {
        testTries = new WordTries('a a b c c c')
        expect(testTries.get()).to.deep.equal(['c', 'a', 'b'])
      })
    })

    describe('when called with a word', () => {
      it('still returns an array', () => {
        expect(testTries.get('be')).to.be.an('array')
      })

      it('contains words that appear after passed word (in the string passed to the constructor)', () => {
        expect(testTries.get('be')).to.contain('light')
        expect(testTries.get('be')).to.contain('life')
        expect(testTries.get('be')).to.contain('fire')
        expect(testTries.get('be').length).to.equal(3)
      })

      it('is in order of how often they appear after passed word', () => {
        testTries = new WordTries('a b a b a c')
        expect(testTries.get('a')).to.deep.equal(['b', 'c'])
      })
    })
  })
})
