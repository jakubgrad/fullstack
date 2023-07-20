const ShowAll = ({ persons }) => {
    console.log("from show all", persons);
    return (
        <div>
        {persons.map(p => 
        <div key = {p["name"]}>
          {p["name"]} {p["number"]}
        </div>
        )}
        </div>
    )
}
export default ShowAll