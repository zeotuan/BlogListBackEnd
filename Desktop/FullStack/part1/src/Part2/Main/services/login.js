import axios from 'axios'
const baseUrl = '/api/login'

const login = async (loginDetail) => {
  const response = await axios.post(baseUrl,loginDetail)
  return response
}

const logout = async () => {

}

export default { login }