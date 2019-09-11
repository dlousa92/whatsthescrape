import React from 'react'
import './form.scss'

const Form = (props) => {
  return (
    <div className='form'>
      <p className='form-text'>What's the scrape? This nifty little application will show you all the images on a webpage, as well as the most popular words found on it. To get started, enter a URL in the search field.</p>

      <div className='form-wrapper'>
        <form>
          <input
            type='text'
            className='input'
            value={props.url}
            placeholder='Please enter a url'
            onChange={props.handleChange}
          />
          <button className='submitbutton' onClick={props.handleSubmit}>
          Scrape!
          </button>
        </form>
      </div>
    </div>
  )
}

export default Form
