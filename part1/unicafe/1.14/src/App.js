import { useState } from 'react'


const Button = (props) => (<button onClick={props.handleclick}>{props.text}</button>)

const App = () => {

  const [points, setPoints] = useState(Array(8).fill(0))
  const [selected, setSelected] = useState(0)
  const [mostvoted, changeMostVoted] = useState(0)
  let max = points[0];
  let maxIndex = 0;

  console.log("points: " + points)
  console.log("selected: " + selected)

  // increment the value in position 2 by one


  const Randomize = () => {
    const value3 = Math.floor(Math.random() * 7);
    setSelected(value3)
    console.log(anecdotes[value3])
  }
  const Vote = () => {
    console.log("voted " + selected)
    const copy = [...points]
    copy[selected] += 1
    console.log("copy: " + copy)
    setPoints(copy)
    console.log("points after voting: " + points)
  
    
  }
  const MaxIndex = () => {
    for (let i = 1; i < points.length; i++) {
      if (points[i] > max) {
        maxIndex = i;
        max = points[i];
      }
    }
    console.log("max index: "+maxIndex)
    return (
      <div>
      {anecdotes[maxIndex]}
      <div>
      has {points[maxIndex]} votes
      </div>
      </div>
    )
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
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <Button handleclick={Vote} text="vote" />
      <Button handleclick={Randomize} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <MaxIndex />
    </div>
  )
}

export default App