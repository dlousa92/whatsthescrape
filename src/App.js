import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Form from './components/Form/Form'
import axios from 'axios'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      url: '',
      wordTotal: 0,
      topTenWords: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getTopTenWords = this.getTopTenWords.bind(this)
  }

  getTopTenWords (textArray) {
    let wordCounts = {}
    let topTen = []
    // Don't add words that are too short and most conjuctions, i.e a, in, for, the
    textArray.forEach(word => {
      if (word.length <= 3) {
        return
      }

      if (wordCounts[word]) {
        // If this word is already in our object, increase the count of that word by 1
        wordCounts[word]++
      } else {
        // Otherwise, say that we've found one of that word so far.
        wordCounts[word] = 1
      }
    })
    // Create an object of each word and its count
    Object.keys(wordCounts).forEach(word => {
      topTen.push({
        word: `${word}`,
        count: `${wordCounts[word]}`
      })
    })
    // Sort the words by descending order
    topTen.sort(function (a, b) {
      return b.count - a.count
    })
    // Cut down array to the top ten words
    this.setState({
      topTenWords: topTen.slice(0, 10)
    })
    console.log(this.state)
  }

  handleChange (e) {
    this.setState({
      url: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()

    // First axios request gets text, second one gets images
    axios.all([
      axios.get('http://localhost:8000/scrape', {
        params: {url: this.state.url}
      }),
      axios.get('http://localhost:8000/scrape-img', {
        params: {url: this.state.url}
      })
    ]).then(axios.spread((textRes, imageRes) => {
      const text = textRes.data
      const textArray = text.split(' ')

      // Add up total amount of words
      this.setState({
        wordTotal: textArray.length
      })

      this.getTopTenWords(textArray)
    }))
  }

  render () {
    return (
      <div className='App'>
        <Header />

        <Form
          url={this.state.url}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default App
