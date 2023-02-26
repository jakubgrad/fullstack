import { useState, useEffect } from 'react'
import axios from 'axios'
import { showFiltered } from './components/showFiltered'
import Note from './components/Note'
import ShowAll from './components/showAll'
import ShowFiltered from './components/showFiltered';
import AddPerson2 from './components/AddPerson2';
import backup from './list'


const App = () => {
  //The online REST doesnt always work, hence list is by default backup. Later its declared as online REST
  let list = backup
  console.log("the list from list.js: ",list)
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
  const [countries, setCountries] = useState([]) 
  

  useEffect(() => {
    console.log('requesting countries from restcountries')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise of countries fulfilled')
        setCountries(response.data)
        console.log("Countries from internet REST: ",response.data)
        console.log("specific country name: ",countries[0]["name"]["common"]);
        console.log("specific country: ",countries[0]);
        list = countries
      })
  }, [])

  //List declared as countries, meaning that program uses online REST
  //list = countries
  
  
  const handleSearchInputChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
    setCurrentFilter(event.target.value)
  }

  //const filtered = persons.filter(d => d["name"].toUpperCase().includes(currentFilter.toUpperCase()))
  const filtered = list.filter(d => d["name"]["common"].toUpperCase().includes(currentFilter.toUpperCase()))
  console.log("filtered: ", filtered)
  const asd={"d":"a"}

  for(let keys in list[13]["languages"]){
    var elements = list[13]["languages"][keys];
    console.log("elements: ",elements);
  }
  return (
    <div>    
      
      
          <form onSubmit="">
        <div>
          find countries:
          <input 
          value={newSearch}
          onChange={handleSearchInputChange}
          />
        
        </div>
      </form>

      
      

      {
      newSearch === "" && currentFilter === ""
      ? <div>Be more specifc</div>
      : <ShowFiltered filtered = {filtered} />
      }
      
    </div>
  )
}

export default App
