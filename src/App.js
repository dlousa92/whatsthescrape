import React from 'react'
import Header from './components/Header/Header'
import Form from './components/Form/Form'
import ImageCarousel from './components/ImageCarousel/ImageCarousel'
import Chart from './components/Chart/Chart'
import './App.scss'
import axios from 'axios'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      url: '',
      wordTotal: 0,
      topTenWords: [],
      imagesOnSite: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getTopTenWords = this.getTopTenWords.bind(this)
    this.setImagesOnSite = this.setImagesOnSite.bind(this)
    this.displayResults = this.displayResults.bind(this)
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
    // Create an array of each word and its count
    Object.keys(wordCounts).forEach(word => {
      topTen.push({
        name: `${word}`,
        weight: wordCounts[word]
      })
    })
    // Sort the words by descending order
    topTen.sort(function (a, b) {
      return b.weight - a.weight
    })
    // Cut down array to the top ten words
    this.setState({
      topTenWords: topTen.slice(0, 10)
    })
    console.log(this.state)
  }

  setImagesOnSite (images) {
    let imagesOnSiteWithDuplicates = []
    let imagesOnSite = []

    // If image is stored locally, do not add it as a viewable image to our images on site array, otherwise push it into our images with duplicates array
    images.forEach(image => {
      if (image.src.substr(0, 4) !== 'http') {
        return
      }
      imagesOnSiteWithDuplicates.push(image)
    })

    // Removes duplicate images from our images with duplicates array
    function removeDuplicates (imagesOnSiteWithDuplicates, src) {
      let newArray = []
      let lookupObject = {}

      for (var i in imagesOnSiteWithDuplicates) {
        lookupObject[imagesOnSiteWithDuplicates[i][src]] = imagesOnSiteWithDuplicates[i]
      }

      for (i in lookupObject) {
        newArray.push(lookupObject[i])
      }
      return newArray
    }

    imagesOnSite = removeDuplicates(imagesOnSiteWithDuplicates, 'src')

    this.setState({
      imagesOnSite: imagesOnSite
    })
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
      const images = imageRes.data

      // Add up total amount of words
      this.setState({
        wordTotal: textArray.length
      })

      // Run our data formatting functions
      this.setImagesOnSite(images)
      this.getTopTenWords(textArray)
    }))
  }

  displayResults () {
    if (this.state.topTenWords.length === 0) {
      return
    }
    return (
      <div>
        <ImageCarousel url={this.state.url} images={this.state.imagesOnSite} />
        <Chart url={this.state.url} topTenWords={this.state.topTenWords} wordTotal={this.state.wordTotal} />
      </div>
    )
  }

  render () {
    return (
      <div className='app'>
        <Header />

        <Form
          url={this.state.url}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        {this.displayResults()}
      </div>
    )
  }
}

export default App
