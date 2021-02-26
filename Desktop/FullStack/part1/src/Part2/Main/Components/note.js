import React from "react"

const Note = ({ note,toggleImportance }) => {
	const label = note.important? "make not important":"make important"
	return (
		<React.Fragment>
			<li className='note'>{note.content}</li>
			<button onClick={toggleImportance}>{label}</button>
		</React.Fragment>
	)
}

export default Note