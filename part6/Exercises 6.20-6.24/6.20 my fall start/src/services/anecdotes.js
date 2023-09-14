import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (id) => {
    console.log(`anecdotes vote id ${id}`);
    const response = await axios.get(`${baseUrl}/${id}`);
    const anecdote = response.data; // Access the data property
    console.log(`anecdotes anecdote get ${JSON.stringify(anecdote)}`);
    const modifiedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    console.log(`modifiedAnecdote ${JSON.stringify(modifiedAnecdote)}`);
    const updateResponse = await axios.put(`${baseUrl}/${id}`, modifiedAnecdote);
    return updateResponse.data;
  /*
  console.log(`anecdotes vote id ${id}`);
  const anecdote = await axios.get(`${baseUrl}/${id}`)
  console.log(`anecdotes anecdote get ${JSON.stringify(anecdote.data)}`);
  const modifiedAnecdote = {...anecdote, votes: anecdote.votes+1}
  console.log(`modifiedAnecdote ${modifiedAnecdote}`);
  const response = await axios.put(`${baseUrl}/${id}`, modifiedAnecdote)
  return response.data
  */
}

export default { 
  getAll, 
  createNew, 
  vote,
}
