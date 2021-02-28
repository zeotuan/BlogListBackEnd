import React from 'react'

const Part = (props) => {
  const { part } = props
  console.log(part)
  return (
    <React.Fragment>
      <p> {part.name} {part.exercises}</p>
    </React.Fragment>
  )
}

export default Part