import React, { useState,useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import personServices from './Services/persons'
import Notification from './Components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [filterText, setFilterText] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    personServices.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])



  const handlePersonAdded = (newPerson) => {
    const foundIndex = persons.findIndex(person => person.name === newPerson.name)
    if (foundIndex >= 0){
      personServices
        .update(persons[foundIndex].id,newPerson)
        .then(returnedPerson => {
          let newPersons = persons
          newPersons[foundIndex] = returnedPerson
          setPersons([...newPersons])
        }).catch(error => setError(error.response.data))
    }else{
      personServices
        .create(newPerson)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
        .catch(error => setError(error.response.data))
    }


  }

  const handleFilterChange=(text) => {
    setFilterText(text)
  }

  const setError = (errorM) => {
    setErrorMessage(errorM)
    setTimeout(() => {
      setErrorMessage('')
    },3000)
  }

  const handlePersonDelete = (id) => {
    const personToBeDeleted = persons.find(person => person.id === id)
    const confirm = window.confirm(`Do you want to delete ${personToBeDeleted.name}`)
    if(confirm){
      personServices.deletePerson(id)
      const newPersons = persons.filter(person => person.id !== id)
      setPersons(newPersons)
    }

  }

  return (
    <div>
      <Notification errorMessage={errorMessage}/>
      <h2>Phonebook</h2>
      <Filter filterText={filterText} onFilterChange={handleFilterChange}/>
      <PersonForm handlePersonAdded={handlePersonAdded} />
      <h2>Numbers</h2>
      <Persons persons = {persons} filterText = {filterText} handleDeletePerson={handlePersonDelete}/>
    </div>
  )
}


export default App