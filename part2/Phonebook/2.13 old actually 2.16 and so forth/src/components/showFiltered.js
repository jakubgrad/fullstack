import { useState, useEffect } from 'react'
const ShowFiltered = ({ filtered }) => {
    console.log("from show filtered", filtered);
    var elements = []
    const [showCountry, setShowCountry] = useState(Array(10).fill(0))
    const [selectCountry, setSelectCountry] = useState(filtered)
    const [chosen, setChosen] = useState(false)
    const [currentFilter, setCurrentFilter] = useState('')
    //const newArray = showCountry.copy()
    //console.log(newArray)
    console.log("show country",showCountry)
    if (filtered.length === 1) {
      for(let keys in filtered[0]["languages"]){
        elements = elements.concat(filtered[0]["languages"][keys])
        console.log("elements from conditional: ",elements);
      }
    }

    const setFilter = (event) => {
      event.preventDefault()
      setCurrentFilter(event.target.value)
      console.log("successfully set a new filter")
      setChosen(false)
    }

    const chooseCountry = (event) => {
      event.preventDefault()
      
      setShowCountry(event.target.id)
      setChosen(true)
      console.log("showCountry:", showCountry)
    }

    var index=0

    return (
        <div>
          <form onSubmit={setFilter}>
        <div>
          
        
        <div>
          <button type="submit">set filter</button>
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
                    <h1>{console.log("erroddr:",filtered[showCountry]["name"]["common"])}
                    
                    {filtered[showCountry]["name"]["common"]}</h1>
                    <div>capital {filtered[showCountry]["capital"]}</div>
                    <div>area {filtered[showCountry]["area"]}</div>
                    
                    <div><strong>languages:</strong></div>
                    <div>{elements.map(p => 
                    <div key = {p}>
                      {p}
                    </div>
                    )}</div>
                    <div>{filtered[showCountry]["flag"]}</div>
                    
                  </div> 
                : filtered.map((p, kolejnosc) => 
                    <div key = {p["name"]["common"]}>
                      {p["name"]["common"]}
                      <form onSubmit={chooseCountry} id={kolejnosc}>
                        <div>
                          <button type="submit">show {index+=1} koej {kolejnosc}</button>
                        </div>
                      </form>
                    </div>
                    )

            }
        
        </div>
    )
}
export default ShowFiltered
