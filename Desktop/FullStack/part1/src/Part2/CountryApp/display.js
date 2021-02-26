import React, { useState, useEffect } from "react"
import Country from "./country"

const Display = ({countries, filter}) => {

	const [filterResult, setFilterResult] = useState([])
	useEffect(() =>{
		const result = countries.filter(country => {
			return country.name.toLowerCase().includes(filter.toLowerCase())
		}
		)
		console.log(result)
		setFilterResult(result)
	},[filter])


	return (
		<React.Fragment>
			<h2>Search Result</h2>
			{filterResult.map(country => <Country key={country.alpha3Code} country={country} />)}        
		</React.Fragment>
	)
}

export default Display