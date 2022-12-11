import { useState } from 'react'

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Display = props => <div>{props.text}{props.value}</div>

const Button = (props) => ( <button onClick={props.handleclick}>{props.text}</button> )

const StatisticLine = (props) => {
  return (
    <div>{props.text} {props.value}</div>
  )
}

const Statistics = ({good,neutral,bad}) => (
    <div>
  <StatisticLine text="all" value ={good+neutral+bad} />
  <StatisticLine text="average " value={good+neutral+bad} />
  <StatisticLine text="positive " value={good/(good+neutral+bad)*100+"%"} />
  </div>
  )


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const HandleGood = () => {
    console.log("good", good+1)
    setGood(good + 1)
  }
  const HandleNeutral = () => {
    console.log("neutral", neutral+1)
    setNeutral(neutral + 1)
  }
  const HandleBad = () => {
    console.log("bad", bad+1)
    setBad(bad + 1)
  }

  if (good+neutral+bad === 0) {
    return (
      <div>
        <Header text="give feedback" />
            <Button handleclick={HandleGood} text="good" />
            <Button handleclick={HandleNeutral} text="neutral" />
            <Button handleclick={HandleBad} text="bad" />
            <Header text="statistics" />
            <p>No feedback given</p>
      </div>
    )
  }
  

  return (
    <div>
            <Header text="give feedback" />
            <Button handleclick={HandleGood} text="good" />
            <Button handleclick={HandleNeutral} text="neutral" />
            <Button handleclick={HandleBad} text="bad" />
            <Header text="statistics" />
            <Display text="good " value={good} />
            <Display text="neutral " value={neutral} />
            <Display text="bad " value={bad} />
            <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
