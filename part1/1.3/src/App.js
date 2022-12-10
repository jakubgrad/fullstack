const Part = (props) => {
  return (
    <p>{props.exercise} {props.number}</p>
  )
}
const Header = (props) => {
  console.log(props)
  return  (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}
const Content = (props) => {            
  return (
    <div>
      <p></p>
      <Part exercise = {props.part1} number = {props.exercises1}/>
      <Part exercise = {props.part2} number = {props.exercises2}/>
      <Part exercise = {props.part3} number = {props.exercises3}/>
      </div>
  )
}
const Total = (props) => {
  return (
  <div>
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  </div>
  )
}

const sum = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}  
const result = sum(1, 5)
console.log(result)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header course={course} />
      <Content part1 = {part1.name} exercises1 = {part1.exercises} part2 = {part2.name} exercises2 = {part2.exercises} part3 = {part3.name} exercises3 = {part3.exercises} />
      <Total exercises1 = {part1.exercises} exercises2 = {part2.exercises} exercises3 = {part3.exercises}/>
    </div>
  )
}

export default App
