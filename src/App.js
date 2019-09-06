import React from 'react'
import './App.css'
import Form from './components/Form/Form'

class App extends React.Component {
  render () {
    return (
      <div className='App'>
        <header className='App-header'>
          <Form hello='hello' />
        </header>
      </div>
    )
  }
}

export default App
