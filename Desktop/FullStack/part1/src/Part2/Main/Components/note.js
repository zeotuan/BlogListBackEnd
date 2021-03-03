import React from 'react'
import PropTypes from 'prop-types'

const Note = ({ note,toggleImportance }) => {
  const label = note.important? 'make not important':'make important'
  return (
    <React.Fragment>
      <li className='note'>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </li>
    </React.Fragment>
  )
}


Note.propTypes = {
  note: PropTypes.shape({
    content: PropTypes.string.isRequired,
    important: PropTypes.bool.isRequired
  }).isRequired
}

export default Note