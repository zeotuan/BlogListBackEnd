import React from 'react'


const Notifiction = ({errorMessage}) => {
    

    return(
        <React.Fragment>
            {errorMessage && 
                <div className = 'error'>
                    {errorMessage}
                </div>}
        </React.Fragment>
    )
}

export default Notifiction