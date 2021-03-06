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
        layer.add(words[i + j], false)
        layer = layer.wordFrequencies[words[i + j]].nextWords
      }
    }
  }

  this.sort(true)
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
    let result = this.words

    words.find(word => {
      if(layer.wordFrequencies[word]){
        layer = layer.wordFrequencies[word].nextWords
        result = layer.words  
      } else {
        result = []
        return true
      }
    })

    return result
  }
}

WordTries.prototype.sort = function(recursive) {
  this.words = Object.keys(this.wordFrequencies).sort((a, b) => {
    return this.wordFrequencies[b].count - this.wordFrequencies[a].count
  })

  if(recursive && this.depth > 0){
    Object.keys(this.wordFrequencies).forEach(key => {
      this.wordFrequencies[key].nextWords.sort(true)
    })
  }
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
    this.sort(false)
  }
}

module.exports = WordTries
