import React, { useState } from 'react'


const AnecGenerator = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoint] = useState({0: 0, 1: 0, 2: 0, 3: 0 ,4: 0, 5: 0})
    const handleClick = () =>{
        const result = Math.floor(Math.random() * (anecdotes.length))
        setSelected(result)
        
    }

    const handleVote = () =>{
        const newPoint = {...points, [selected]:points[selected]+1}
        setPoint(newPoint)
    }

    const getMostVote = () =>{
        const i = Object.keys(points).reduce((a,b) => points[a] > points[b] ? a:b)
        
        return i
    }

    return (
      <div>
        <h1>{anecdotes[selected]}</h1>
        <h2> has {points[selected]} Vote</h2>
        <button onClick={handleClick}>Get anecdotes</button>
        <button onClick={handleVote}>Vote</button>
        <h1>Anecdote with most votes</h1>
        <h2>{anecdotes[getMostVote()]} has {points[getMostVote()]}</h2>
      </div>
    )
  }
  
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]


  export default AnecGenerator