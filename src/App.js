import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Form from './components/Form/Form'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      url: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    this.setState({
      url: e.target.value
    })
  }

  handleSubmit (e) {
    e.preventDefault()
    console.log(this.state.url)
  }

  render () {
    return (
      <div className='App'>
        <Header />

        <Form
          hello='hello'
          url={this.state.url}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default App
