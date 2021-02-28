import React, { useState } from 'react'
import Weather from './weather'

const Country = ({ country }) => {
  //console.log(country)
  const [show,setShow] = useState(false)
  return (
    <React.Fragment>
      <p>{country.name}</p> <button onClick={() => setShow(!show)}>show</button>
      {show && <div>
        <p>{country.capital}</p>
        <p>{country.population}</p>
        <h2>Spoken Language</h2>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt={`${country.name} flag`} ></img>
        <Weather cityName={country.capital} />
      </div>}

    </React.Fragment>
  )
}

export default Country