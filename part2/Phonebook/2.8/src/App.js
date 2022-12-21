import { useState } from 'react'

const App = () => {
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '39-44-5323523' }
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
        name: newPerson,
        number: newNumber
      }
      setPersons(persons.concat(noteObject))
      setNewPerson('')
      setNewNumber('')
    } else {
      window.alert(`${newPerson} is already added to phonebook`)
    }

    
    console.log("persons: ",persons)
    
  }

  const handlePersonInputChange = (event) => {
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
          value={newPerson}
          onChange={handlePersonInputChange}
          />
          <div>
            number:
            <input 
            value={newNumber}
            onChange={handleNumberInputChange}
            />
          </div>  
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(p => 
        <div key = {p["name"]}>
          {p["name"]} {p["number"]}
        </div>
        )}
    </div>
  )
}

export default App