function WordTries(words, depth) {
  this.depth = depth || 0
  this.wordFrequencies = {}

  if (typeof words === 'string') {
    words = words.toLowerCase().match(/\w+/g) || []
    // could also use .split(/\W/).filter(w => w !== '')
  }

  let word
  for (let i = 0; i < words.length; i++) {
    word = words[i]
    this.add(word, false)

    for (let j = 1; j <= this.depth; j++) {
      if (i + j < words.length) {
        const nextWords = this.wordFrequencies[word].nextWords
        nextWords[words[i + j]] = nextWords[words[i + j]] || 0
        nextWords[words[i + j]] += 1
      }
    }
  }

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
    nextWords: this.depth > 1 ? new WordTries('', this.depth - 1) : {},
  }

  this.wordFrequencies[word].count += 1

  if (sort) {
    this.sort()
  }
}

module.exports = WordTries
