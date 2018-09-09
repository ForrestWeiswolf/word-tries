function WordTries(words, depth) {
  this.depth = depth
  this.wordFrequencies = {}

  if (typeof words === 'string') {
    words = words.toLowerCase().split(/\W/)
  }

  words.forEach((word, idx) => {
    this.add(word, false)

    if (idx + 1 < words.length) {
      const nextWords = this.wordFrequencies[word].nextWords
      nextWords[words[idx + 1]] = nextWords[words[idx + 1]] || 0
      nextWords[words[idx + 1]] += 1
    }
  })

  this.sort()

  Object.keys(this.wordFrequencies).forEach(word => {
    this.wordFrequencies[word].nextWords = new WordTries(
      Object.keys(this.wordFrequencies[word].nextWords)
    )
  })
}

WordTries.prototype.get = function(...words) {
  if (words.length > this.depth) {
    throw new Error(
      `Cannot get with depth ${words.length} in a WordTries of depth ${
        this.depth
      }`
    )
  } else {
    let layer = this
    words.forEach(word => {
      layer = layer.wordFrequencies[word].nextWords
    })
    return layer.words
  }
}

WordTries.prototype.sort = function() {
  this.words = Object.keys(this.wordFrequencies).sort((a, b) => {
    return this.wordFrequencies[b].count - this.wordFrequencies[a].count
  })
}

WordTries.prototype.add = function(word, sort = true) {
  this.wordFrequencies[word] = this.wordFrequencies[word] || {
    count: 0,
    nextWords: {},
  }

  this.wordFrequencies[word].count += 1

  if (sort) {
    this.sort()
  }
}

module.exports = WordTries
