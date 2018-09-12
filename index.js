function WordTries(words, depth) {
  this.depth = depth || 0
  this.wordFrequencies = {}

  if (typeof words === 'string') {
    words = words.toLowerCase().match(/[\w']+/g) || []
    // could also use .split(/\W/).filter(w => w !== '')
  }

  let word
  for (let i = 0; i < words.length; i++) {
    word = words[i]
    this.add(word, false)

    let layer = this.wordFrequencies[word].nextWords
    for (let j = 1; j <= this.depth; j++) {
      if (i + j < words.length) {
        layer.add(words[i + j])
        layer = layer.wordFrequencies[words[i + j]].nextWords
      }
    }
  }

  this.sort()
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
  if (this.depth === 0) {
    this.wordFrequencies[word] = this.wordFrequencies[word] || { count: 0 }
  } else {
    this.wordFrequencies[word] = this.wordFrequencies[word] || {
      count: 0,
      nextWords: this.depth > 0 ? new WordTries('', this.depth - 1) : {},
    }
  }

  this.wordFrequencies[word].count += 1

  if (sort) {
    this.sort()
  }
}

module.exports = WordTries
