const ShowAll = ({ persons, handleDeleteById }) => {
    return (
        <li className="note">
        {persons.map(p => 
        <div key = {p["name"]}>
          {p["name"]} {p["number"]}
          <form>
        <button onClick={handleDeleteById} value={p["id"]}>Delete</button>
        </form>
        </div>
        )}
        
        </li>
    )
}
export default ShowAll