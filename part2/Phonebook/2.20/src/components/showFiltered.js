import axios from 'axios';
import { useState } from 'react'
const ShowFiltered = ({ filtered }) => {
    //console.log("from show filtered", filtered);
    var elements = []
    const [showCountry, setShowCountry] = useState(Array(10).fill(0))
    const [chosen, setChosen] = useState(false)
    const [currentFilter, setCurrentFilter] = useState('')
    const [weather, setWeather] = useState('')
    //const newArray = showCountry.copy()
    //console.log(newArray)
    //console.log("show country",showCountry)
    if (filtered.length === 1) {
      for(let keys in filtered[0]["languages"]){
        elements = elements.concat(filtered[0]["languages"][keys])
        //console.log("elements from conditional: ",elements);
      }
    }

    const setFilter = (event) => {
      event.preventDefault()
      setCurrentFilter(event.target.value)
      //console.log("successfully set a new filter")
      setChosen(false)
    }

    const chooseCountry = (event) => {
      event.preventDefault()
      const country = event.target.id
      const capital = event.target.name
      setShowCountry(country)
      //const capital = filtered["country"]["capital"]
      setChosen(true)
      console.log('requesting country s weather from openweather')
      const api_key = process.env.REACT_APP_API_KEY
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)
        .then(response => {
          console.log('promise of a capital s weather fulfilled')
          setWeather(response.data)
          console.log("Weather collected: ",response.data)
          console.log("Element: ",response.data["weather"][0]["icon"])
          //const iconlink = "https://openweathermap.org/img/wn/"+response.data["weather"]["icon"]+"@2x.png"
        })
    }

    return (
        <div>
          <form onSubmit={setFilter}>
        <div>
          
        
        <div>
         {/*<button type="submit">set filter</button>*/}
        </div>
        </div>
      </form>
          {
            filtered.length===1
            ? <div>
                <h1>{filtered[0]["name"]["common"]}</h1>
                <div>capital {filtered[0]["capital"]}</div>
                <div>area {filtered[0]["area"]}</div>
                
                <div><strong>languages:</strong></div>
                <div>{elements.map(p => 
                <div key = {p}>
                  {p}
                </div>
                )}</div>
                <div>{filtered[0]["flag"]}</div>
              </div>  

            : filtered.length>10
              ? <div>Too many matches, specify another filter</div>
              : chosen
                ? <div>
                  {/*()=>setChosen(false)*/}
                  {/*console.log("erroddr:",filtered[showCountry]["name"]["common"])*/}
                    <h1>{filtered[showCountry]["name"]["common"]}</h1>
                    <div>capital {filtered[showCountry]["capital"]}</div>
                    <div>area {filtered[showCountry]["area"]}</div>
                    
                    <div><strong>languages:</strong></div>
                    <div>{elements.map(p => 
                    <div key = {p}>
                      {p}
                    </div>
                    )}</div>
                    <div>{filtered[showCountry]["flag"]}</div>
                    <div>Temp: {weather ? weather["main"]["temp"] : weather} C</div>
                    <div>Wind: {weather ? weather["wind"]["speed"] : weather} m/s</div>
                    <div>{weather ? <img src={'https://openweathermap.org/img/wn/'+weather["weather"][0]["icon"]+'@2x.png'}></img> : weather}</div>
                    {/*weather["weather"]["icon"]*/}
                  </div> 
                : filtered.map((p, kolejnosc) => 
                    <div key = {p["name"]["common"]}>
                      {p["name"]["common"]} with capital {p["capital"][0]}
                      <form onSubmit={chooseCountry} id={kolejnosc} name={p["capital"][0]}>
                        <div>
                          <button type="submit">show</button>
                          {/*<button type="submit">show {index+=1} koej {kolejnosc}</button>*/}
                        </div>
                      </form>
                    </div>
                    )

            }
        
        </div>
    )
}
export default ShowFiltered
