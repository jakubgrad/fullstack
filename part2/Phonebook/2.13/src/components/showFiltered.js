import { useState, useEffect } from 'react'
const ShowFiltered = ({ filtered }) => {
    console.log("from show filtered", filtered);
    var elements = []
    const [showCountry, setShowCountry] = useState(Array(10).fill(0))
    const [selectCountry, setSelectCountry] = useState(100)
    const newArray = showCountry.copy()
    console.log(newArray)
    console.log("show country",showCountry)
    if (filtered.length === 1) {
      for(let keys in filtered[0]["languages"]){
        elements = elements.concat(filtered[0]["languages"][keys])
        console.log("elements from conditional: ",elements);
      }
    }
    return (
        <div>
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
            : filtered.map(p => 
              <div key = {p["name"]["common"]}>
                {p["name"]["common"]}
              </div>
              )

          }
        
        </div>
    )
}
export default ShowFiltered
