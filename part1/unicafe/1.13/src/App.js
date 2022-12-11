import { useState } from 'react'


const Button = (props) => ( <button onClick={props.handleclick}>{props.text}</button> )

const App = () => {
  
  const [points, setPoints] = useState(Array(8).fill(0))
  const [selected, setSelected] = useState(0)
  const [voted, addVote] = useState(8)
  
  console.log("points: "+points)
  console.log("selected: "+selected)
  
  // increment the value in position 2 by one
  

  const Randomize = () => {
    const value3 = Math.floor(Math.random() * 7);
    setSelected(value3)
    console.log(anecdotes[value3])
  }
  const Vote = () => {
    console.log("voted "+selected)
    const copy = [...points]
    copy[selected] += 1
    console.log("copy: "+copy)
    setPoints(copy)
    console.log("points after voting: "+points)
  }
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
   
  

  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <Button handleclick = {Randomize} text = "next anecdote"/>
      <Button handleclick = {Vote} text = "vote"/>
    </div>
  )
}

export default App
