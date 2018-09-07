const expect = require('chai').expect
const WordTries = require('./index.js')

describe('WordTries', () => {
  const testString =
    'We be light, we be life, we be fire. We sing electric flame, we rumble underground wind, we dance heaven!'

  it('is a function', () => {
    expect(WordTries).to.be.a('function')
  })

  it('can be called as a constructor, taking a string and a number', () => {
    expect(new WordTries(testString, 1)).to.be.an('object')
  })
})
