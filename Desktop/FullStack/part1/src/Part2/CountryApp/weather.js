import axios from "axios"
import React, { useState, useEffect } from "react"


const Weather = ({cityName}) => {
	const api_key = process.env.REACT_APP_WEATHER_API_KEY
	const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${cityName}`
	const [weather,setWeather] = useState({})
	const [isFetch, setIsFetch] = useState(false)
	useEffect(() => {
		axios.get(url).then(response => {
			console.log(response.data)
			setWeather(response.data)
			setIsFetch(true)
		})
	},[])

	return ( 
		<React.Fragment>
			<h1>Weather in {cityName}</h1>
			{isFetch && <div>
				<h2>temparature:{weather.current.temparature}</h2>
				<img src={weather.current.weather_icons[0]} alt={weather.current.weather_descriptions[0]}></img>
				<h2>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</h2>
			</div>}
		</React.Fragment>
	)
}

export default Weather 