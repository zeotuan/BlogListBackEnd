import React, { useState } from 'react'



const Filter = ({ filterText, onFilterChange }) => {

  return (
    <React.Fragment>
            find Countries <input type='text' value = {filterText} onChange={(e) => onFilterChange(e.target.value)}/>
    </React.Fragment>
  )
}


export default Filter