import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Filter from './filter'
import Display from './display'


const App = () => {

  const [countries, setCountries] = useState([])
  const [filterText, setFitlerText] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      console.log(response.data)
      setCountries(response.data)
    })
  }, [])

  const handleFilterChange = (Text) => {
    setFitlerText(Text)
  }

  return(
    <React.Fragment>
      <Filter filterText={filterText} onFilterChange={handleFilterChange}/>
      <Display countries = {countries} filter = {filterText}/>
    </React.Fragment>
  )
}


export default App