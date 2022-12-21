import { useState, useEffect } from 'react'
import axios from 'axios'
import { showFiltered } from './components/showFiltered'
import Note from './components/Note'
import ShowAll from './components/showAll'
import ShowFiltered from './components/showFiltered';
import AddPerson2 from './components/AddPerson2';


const App = () => {

  let text = "Hello world, welcome to the universe.";
  let result = text.includes("ME TO");
  console.log(result)
  //below three lines added for the example from material.
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)  
  const [newSearch, setNewSearch] = useState('')
  const [currentFilter, setCurrentFilter] = useState('')
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [persons, setPersons] = useState([]) 
  
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
        setPersons(response.data)
        console.log("Notes from response data: ",response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')



  
  
  const setFilter = (event) => {
    event.preventDefault()
    setCurrentFilter(newSearch)
    console.log("successfully set a new filter")
  
  }

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
  
  const handleSearchInputChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const filtered = persons.filter(d => d["name"].toUpperCase().includes(currentFilter.toUpperCase()))
  console.log("filtered: ", filtered)

  return (
    <div>
      <h2>Phonebook</h2>
      
      <form onSubmit={setFilter}>
        <div>
          filter shown with: 
          <input 
          value={newSearch}
          onChange={handleSearchInputChange}
          />
        
        <div>
          <button type="submit">add</button>
        </div>
        </div>
      </form>

      <AddPerson2 
      handlePersonInputChange={handlePersonInputChange} 
      newNumber={newNumber} 
      handleNumberInputChange={handleNumberInputChange} 
      newPerson={newPerson}
      addPerson={addPerson}
      />  

      <h2>Numbers</h2>
      {
      newSearch === "" && currentFilter === ""
      ? <ShowAll persons = {persons} />
      : <ShowFiltered filtered = {filtered} />
      }
      
    </div>
  )
}

export default App