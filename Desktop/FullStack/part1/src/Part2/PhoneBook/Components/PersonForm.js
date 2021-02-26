import React, {useState} from "react"

const PersonForm = ({handlePersonAdded}) => {
	const [ newName, setNewName ] = useState("")
	const [ newNumber, setNewNumber] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		const newPerson = {
			name: newName,
			number: newNumber
		}
		handlePersonAdded(newPerson)
		setNewName("")
		setNewNumber("")
        
	}

	return (
		<form onSubmit={handleSubmit}>
			<div>
                name: <input type = 'text' value={newName} name = "name" onChange={(e)=> {setNewName(e.target.value)}}/>
			</div>
			<br/>
			<div>
                number: <input type= 'number' value ={newNumber} name="number" onChange={(e) => {setNewNumber(e.target.value)}}/>
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

export default PersonForm