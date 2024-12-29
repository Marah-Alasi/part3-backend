import axios from 'axios'
const PORT = 'https://part3-backend-k3b0.onrender.com/'
const baseUrl = `http://${PORT}/api/persons`

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(response => response.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}


export default {getAll, create, update, deletePerson}