import { useState, useEffect } from 'react'
import ShowAll from './components/showAll'
import ShowFiltered from './components/showFiltered';
import AddPerson2 from './components/AddPerson2';
import personService from './services/persons';


const App = () => {

//below three lines added for the example from material.
const [newSearch, setNewSearch] = useState('')
const [currentFilter, setCurrentFilter] = useState('')
const [newPerson, setNewPerson] = useState('')
const [newNumber, setNewNumber] = useState('')
const [persons, setPersons] = useState([]) 
const [errorMessage, setErrorMessage] = useState(null)
const [success, setSuccess] = useState(false)

useEffect(() => {
console.log('effect')
personService.getAll()
  .then(response => {
    console.log('promise fulfilled, getAll successful')
    setPersons(response)
    console.log("Entries: ",response)
  })
}, [])

const Notification = ({ message }) => {
if (message === null) {
  return null
}

return (
  <div className={success ? 'success' : 'error'}>
    {message}
  </div>
)
}




const setFilter = (event) => {
event.preventDefault()
setCurrentFilter(newSearch)
}

const createNewId = () => {
return Math.max(...persons.map(p=>p.id))+1
}

const addPerson = (event) => {
event.preventDefault()
const names = persons.map(p => p["name"])
let flag = false
for (let i=0; i<persons.length; i++) {
  if (persons[i]["name"] === newPerson) {
    flag = true
  }
}
if (flag === false) {
  const personObject = {
    name: newPerson,
    number: newNumber,
    id: createNewId()
  }
  personService
    .create(personObject)
    .then(response =>{
      setSuccess(true)
      setErrorMessage(
        `Added ${newPerson}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setPersons(persons.concat(personObject))
      setNewPerson('')
      setNewNumber('')
    })
    .catch(response =>{
    setSuccess(false)
    setErrorMessage(
      `Could not create a new entry`
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)

  })
} else {
  //window.alert(`${newPerson} is already added to phonebook`)
  if(window.confirm(`${newPerson} is already in the phonebook, replace the old number with the new one?`)) {
    //Number change
    const id = persons.filter(p => p["name"] === newPerson)[0]["id"]
    const personObject = {
      name: newPerson,
      number: newNumber,
      id: id
    }
    personService
      .update(id,personObject)
      .then(response => {
        setSuccess(true)
        setErrorMessage(
          `Updated the number of ${newPerson}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.map(p => p.id !== id ? p : response))
        })
      .catch(result => {
        setSuccess(false)
        setErrorMessage(
          `Information of '${personObject.name}' was already removed from server`
        )
        setPersons(persons.filter(p => p.id !== id))
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  } else {
    //No number change
  }
}

}

const handlePersonInputChange = (event) => {
setNewPerson(event.target.value)
}

const handleNumberInputChange = (event) => {
setNewNumber(event.target.value)
}

const handleSearchInputChange = (event) => {
setNewSearch(event.target.value)
}

const handleDeleteById = (event) => {
event.preventDefault()
const id = Number(event.target.value)
const person = persons.filter(p => p.id === id)[0]
const name = person.name
if(window.confirm(`Do you want to delete ${name}`)) {
  personService
    .deleteById(id)
    .then(response => 
      {
        setSuccess(true)
        setErrorMessage(
          `Deleted ${name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      setPersons(persons.filter(p => p.id !== id))
      }
    )
    .catch(response => {
        setSuccess(false)
        setErrorMessage(
          `${name} was already deleted`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.filter(p => p.id !== id))
    })
}
}

const filtered = persons.filter(d => d["name"].toUpperCase().includes(currentFilter.toUpperCase()))

return (
<div>
  <h1>Phonebook</h1>
  <Notification message={errorMessage} />
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
  ? <ShowAll persons = {persons} handleDeleteById={handleDeleteById} />
  : <ShowFiltered filtered = {filtered} />
  }
  
</div>
  )
}

export default App