import axios from 'axios'
const baseUrl = '/api/notes'



const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const delete3 = id2 => {
  console.log(id2)
  var id = id2
  const request = axios.delete(`${baseUrl}/${id2}`)
  return request.then(response => response.data)
}

export default {
  getAll,
  create,
  update,
  delete3
}
