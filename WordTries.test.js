const expect = require('chai').expect
const WordTries = require('./index.js')

describe('WordTries', () => {
  const testString =
    'We be light, we be life, we be fire. We sing electric flame, we rumble underground wind, we dance heaven!'

  let testTries, testTries2
  beforeEach(() => {
    testTries = new WordTries(testString, 1)
    testTries2 = new WordTries(testString, 2)
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
        testString
          .split(/\W/)
          .filter(w => w !== '')
          .forEach(word => {
            expect(testTries.get()).to.contain(word.toLowerCase())
          })
      })

      it('contains each word exactly once', () => {
        testTries.get().forEach(word => {
          expect(testTries.get().filter(w => w === word).length).to.equal(1)
        })
      })

      it('ignores case', () => {
        testTries = new WordTries('That that')

        expect(testTries.get().length).to.equal(1)
      })

      it('is in order of frequency', () => {
        testTries = new WordTries('a a b c c c')
        expect(testTries.get()).to.deep.equal(['c', 'a', 'b'])
      })

      it('works even when depth is > 0', () => {
        testTries = new WordTries('a a b c c c', 2)
        expect(testTries.get()).to.deep.equal(['c', 'a', 'b'])
      })
    })

    describe('when called with a word', () => {
      it('still returns an array', () => {
        expect(testTries.get('be')).to.be.an('array')
      })

      it('contains words that appear after passed word (in the string passed to the constructor)', () => {
        expect(testTries.get('we')).to.contain('be')
        expect(testTries.get('we')).to.contain('sing')
        expect(testTries.get('we')).to.contain('rumble')
        expect(testTries.get('we')).to.contain('dance')
        expect(testTries.get('we').length).to.equal(4)
      })

      it('is in order of how often they appear after passed word', () => {
        testTries = new WordTries('a b a b a c', 1)
        expect(testTries.get('a')).to.deep.equal(['b', 'c'])
      })

      it('works even when depth is > 1', () => {
        testTries = new WordTries('a b a b a c', 3)
        expect(testTries.get('a')).to.deep.equal(['b', 'c'])
      })
    })

    describe('when called with more than one word', () => {
      it("throws an error if passed more words than the WordTries' depth", () => {
        function digTooDeep() {
          testTries.get('we', 'be')
        }

        expect(digTooDeep).to.throw(
          'Cannot get with depth 2 in a WordTries of depth 1'
        )
      })

      it('still returns an array', () => {
        expect(testTries2.get('we', 'be')).to.be.an('array')
      })

      it('contains words that appear after the sequence of passed words', () => {
        expect(testTries2.get('we', 'be')).to.contain('light')
        expect(testTries2.get('we', 'be')).to.contain('life')
        expect(testTries2.get('we', 'be')).to.contain('fire')
        expect(testTries2.get('we', 'be').length).to.equal(3)
      })

      it('still is in frequency order', () => {
        testTries = new WordTries('a b c a b c a b d b d b d', 2)
        expect(testTries.get('a', 'b')).to.deep.equal(['c', 'd'])
      })

      it('works at depths greater than 2', () => {
        testTries = new WordTries(testString, 5)
        expect(testTries.get('we', 'be', 'light', 'we', 'be')).to.deep.equal([
          'life',
        ])
      })
    })
  })
})
