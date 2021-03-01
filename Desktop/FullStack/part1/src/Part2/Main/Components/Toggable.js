import React, { useState, useImperativeHandle, forwardRef } from 'react'

const Toggable =  React.forwardRef( (props, ref) => {
  const [visible,setVisible] = useState(false)
  const hiddenWhenVisible = { display: visible? 'none': '' }
  const showWhenVisible = { display: visible? '': 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  }
  )

  return (
    <div>
      <div style={hiddenWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className='toggableContent'>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Toggable.displayName = 'Toggable'

export default Toggable