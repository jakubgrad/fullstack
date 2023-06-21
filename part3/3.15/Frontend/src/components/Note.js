const Note = ({ name, number, id }) => {
  

  return (
    <div>
    <li className='note'>
      {name} {number} 
    </li>
  </div>
  )
}

export default Note
