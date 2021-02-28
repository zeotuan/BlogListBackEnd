import React from 'react'


const Persons = ({ persons,filterText,handleDeletePerson }) => {
  console.log(persons)
  return (
    <React.Fragment>
      {persons.map((person) => {
        return person.name.toLowerCase().includes(filterText.toLowerCase()) &&
                        <React.Fragment key={person.id }>
                        	<p>{person.name} : {person.number}</p>
                        	<button onClick = {() => handleDeletePerson(person.id)}>delete</button>
                        </React.Fragment>
      })
      }
    </React.Fragment>
  )
}

export default Persons

