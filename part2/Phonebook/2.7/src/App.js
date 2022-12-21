import { useState } from 'react'

const App = () => {
  const [newPerson, setNewPerson] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  
  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(p => p["name"])
    console.log("map: ", names)
    let flag = false
    for (let i=0; i<persons.length; i++) {
      if (persons[i]["name"] == newPerson) {
        console.log("persons at i name: ",persons[i]["name"], "newPerson: ", newPerson);
        flag = true
      }
    }

    console.log("t/f: ", flag)
    if (flag == false) {
      const noteObject = {
        name: newPerson
      }
      setPersons(persons.concat(noteObject))
      setNewPerson('')
    } else {
      window.alert(`${newPerson} is already added to phonebook`)
    }

    
    console.log("persons: ",persons)
    
  }

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  return (
    <div>
      <h2>Phoneboodk</h2>
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
        <div key = {p["name"]}>
          {p["name"]}
        </div>
        )}
    </div>
  )
}

export default App