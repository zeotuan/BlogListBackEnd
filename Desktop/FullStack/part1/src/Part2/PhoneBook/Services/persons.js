import axios from 'axios'
const baseUrl = "/api/persons"


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl,newObject)
    return request.then(response => response.data)
}

const update = (id,updatedObject) => {
    const request = axios.put(`${baseUrl}/${id}`,updatedObject)
    return request.then(response => response.data)
}

const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
}

export default {getAll,create,update,deletePerson}