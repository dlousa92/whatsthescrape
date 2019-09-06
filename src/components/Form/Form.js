import React from 'react'

const Form = (props) => {
  console.log(props)
  return (
    <div className='form-component'>
      <form className='form'>
        <input
          type='text'
          className='form-input'
          value={props.url}
          placeholder='Please enter a url'
          onChange={props.handleChange}
        />
        <button className='form-submitbutton' onClick={props.handleSubmit}>
          Add Item
        </button>
      </form>
    </div>
  )
}

export default Form
