function WordTries(words, order) {
  this.wordFrequencies = {}

  if (typeof words === 'string') {
    words = words.toLowerCase().split(/\W/)
  }

  words.forEach((word, idx) => {
    this.wordFrequencies[word] = this.wordFrequencies[word] || {
      count: 0,
      nextWords: {},
    }
    this.wordFrequencies[word].count += 1
    if (idx + 1 < words.length) {
      const nextWords = this.wordFrequencies[word].nextWords
      nextWords[words[idx + 1]] = nextWords[words[idx + 1]] || 0
      nextWords[words[idx + 1]] += 1
    }
  })

  this.words = Object.keys(this.wordFrequencies).sort((a, b) => {
    this.wordFrequencies[a].nextWords = new WordTries(
      Object.keys(this.wordFrequencies[a].nextWords)
    )
    return this.wordFrequencies[b].count - this.wordFrequencies[a].count
  })
}

WordTries.prototype.get = function(word) {
  if (word) {
    return this.wordFrequencies[word].nextWords.get()
  } else {
    return this.words
  }
}

// WordTries.prototype.add = function(word) {
//   this.wordFrequencies[word] = this.wordFrequencies[word] || 0
//   this.wordFrequencies[word] += 1
// }

module.exports = WordTries
