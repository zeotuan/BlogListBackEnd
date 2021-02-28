import React from 'react'
import Part from './part'

const Course = (props) => {
  const { course } = props
  console.log(course)
  const totalEx = () => {
    const result = course.parts.reduce((sum,part) => {return sum + part.exercises},0)
    console.log(result)
    return result
  }
  return (

    <React.Fragment>
      <h2>{course.name}</h2>
      {course.parts.map((part) => {
        return <Part key={part.id} part={part} />
      })}
      <p>total exercise: {totalEx()}</p>
    </React.Fragment>
  )
}

export default Course