import React from 'react'

const Form = (props) => {
  console.log(props)
  return (
    <div className="form-component">
      <form className="form">
        <input
          type="text"
          className="form-input"
          placeholder="Please enter a URL"
        />
        <button className="form-submitbutton">
          Add Item
        </button>
      </form>
    </div>
  )
}

export default Form
