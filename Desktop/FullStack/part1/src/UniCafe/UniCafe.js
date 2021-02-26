import React, { useState } from "react"


const UniCafeApp = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const calAverage = () => {
		const average = (good - bad)/(good+bad+neutral)
		console.log(average)
		return average 
	}

	const calPositive = () => {
		const positive = 100 * (good/(good+bad+neutral))
		return positive
	}
  

	return (
		<React.Fragment>
			<h1>Give Feed Back</h1>
			<Button handleClick={()=>{setGood(good+1)}} text="good"/>
			<Button handleClick={()=>{setNeutral(neutral+1)}} text="neutral"/>
			<Button handleClick={()=>{setBad(bad+1)}} text="bad"/>
			<h2> Statistic </h2>
			<Display text = "good" value = {good}/>
			<Display text = "neutral" value = {neutral}/>
			<Display text = "bad" value = {bad}/>
			{ good > 0 || neutral > 0 || bad > 0 ?
				<Statistics good= {good} bad = {bad} neutral = {neutral}/>: <p>No FeedBack </p>
			}
		</React.Fragment>
	)
}

const Button = (props) => {
	return (
		<button onClick={props.handleClick}>{props.text}</button> 
	)
}

const Display = (props) => {
	return (
		<p>{props.text} {props.value}</p>
	)
}

const Statistics = ({good,bad,neutral}) => {
	const calAverage = () => {
		const average = (good - bad)/(good+bad+neutral)
		console.log(average)
		return average 
	}

	const calPositive = () => {
		const positive = 100 * (good/(good+bad+neutral))
		return positive
	}
	return (
		<React.Fragment>
			<Display text = "average:" value = {calAverage()}/>
			<Display text = "Positive:" value = {calPositive()} />
		</React.Fragment>
	)
}
export default UniCafeApp