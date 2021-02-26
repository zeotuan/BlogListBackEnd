import React from "react"


const Filter = ({filterText,onFilterChange}) => {
	return(
		<React.Fragment>
            Find Person <input type='text' value={filterText} onChange={(e) => onFilterChange(e.target.value)}/>
		</React.Fragment>
	)
}

export default Filter