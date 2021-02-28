import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const loginForm = ({ handleLogin }) => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    const loginDetail = {
      username:username,
      password:password
    }
    handleLogin(loginDetail)
    setUsername('')
    setPassword('')
  }

  return (
    <React.Fragment>
      <form onSubmit={handleLoginSubmit}>
        <div>
                    username
          <input
            type='text'
            value={username}
            name='username'
            onChange={(e) => {setUsername(e.target.value)}}/>
        </div>
        <div>
                    password
          <input
            type='password'
            value={password}
            name='password'
            onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <button type='submit'>Login</button>
      </form>
    </React.Fragment>
  )
}

loginForm.PropTypes = {
  handleLogin: PropTypes.func.isRequired
}
export default loginForm