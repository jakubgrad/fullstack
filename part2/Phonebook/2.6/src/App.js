import { useState } from 'react'

const App = () => {
  const [newPerson, setNewPerson] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  
  const addPerson = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newPerson
    }
    setPersons(persons.concat(noteObject))
    setNewPerson('')
    console.log("persons: ",persons)
    
  }

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
          value={newPerson}
          onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p => 
        <div>
          {p["name"]}
        </div>
        )}
    </div>
  )
}

export default App