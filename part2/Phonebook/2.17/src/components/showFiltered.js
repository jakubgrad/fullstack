const ShowFiltered = ({ filtered }) => {
    console.log("from show filtered", filtered);
    return (
        <div>
        {filtered.map(p => 
        <div key = {p["name"]}>
          {p["name"]} {p["number"]}
        </div>
        )
        }
        </div>
    )
}
export default ShowFiltered