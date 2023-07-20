import { useState, useEffect } from 'react'
import axios from 'axios'
import ShowFiltered from './components/showFiltered';
import backup from './list'


const App = () => {
  //The online REST doesnt always work, hence list is by default backup. Later it is declared as online REST
  //let list = backup
  //console.log("the list from list.js: ",list)
  //console.log(result)
  //below three lines added for the example from material.
  const [newSearch, setNewSearch] = useState('')
  const [currentFilter, setCurrentFilter] = useState('')
  const [countries, setCountries] = useState([]) 
  const [list, setList] = useState()

  useEffect(() => {
    //console.log('requesting weather from openweather')
    const api_key = process.env.REACT_APP_API_KEY
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=Helsinki&appid=${api_key}`)
      .then(() => {
        console.log('promise of test weather fulfilled')
        //console.log("Weather from weather REST: (response.data)",response.data)
        //console.log("response ", response)
      })
    //console.log('requesting countries from restcountries')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise of countries fulfilled')
        setCountries(response.data)
        //console.log("Countries from internet REST: ",response.data)
        //console.log(response.data)
        setList(response.data)
      })
  }, [])

  //List declared as countries, meaning that program uses online REST
  //list = countries
  
  
  const handleSearchInputChange = (event) => {
    //console.log(event.target.value)
    setNewSearch(event.target.value)
    setCurrentFilter(event.target.value)
  }

  //const filtered = persons.filter(d => d["name"].toUpperCase().includes(currentFilter.toUpperCase()))
  if(list) {
    const filtered = list.filter(d => d["name"]["common"].toUpperCase().includes(currentFilter.toUpperCase()))
    return (
      <div>    
            <form>
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
  
}

export default App
