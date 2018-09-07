function WordTries(string, order){
  this.wordFrequencies = {}

  string.split(/\W/).forEach(word => {
    this.wordFrequencies[word] = this.wordFrequencies[word] || 0
    this.wordFrequencies[word] += 1
  })

  this.words = Object.keys(this.wordFrequencies).sort((a, b) => {
    return this.wordFrequencies[b] - this.wordFrequencies[a]
  })
}

WordTries.prototype.get = function(){
  return this.words
}

module.exports = WordTries