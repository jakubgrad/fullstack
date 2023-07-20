const AddPerson2 = (props) => {
    const [ addPerson, handlePersonInputChange, newNumber, handleNumberInputChange, newPerson ] = [ props.addPerson, props.handlePersonInputChange, props.newNumber, props.handleNumberInputChange, props.newPerson ]
    return (
        <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
          value={newPerson}
          onChange={handlePersonInputChange}
          />
          <div>
            number:
            <input 
            value={newNumber}
            onChange={handleNumberInputChange}
            />
          </div>  
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}
export default AddPerson2