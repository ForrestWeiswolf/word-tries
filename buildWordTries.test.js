const expect = require('chai').expect
const buildWordTries = require('./index.js')

describe('buildWordTries method', () => {
	it('is a function', () => {
		expect(buildWordTries).to.be.a('function')
	})
})
