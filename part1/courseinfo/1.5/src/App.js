const Part = (props) => {
  return (
    <div>
    <p>{props.exercise} {props.number}</p>
    </div>
  )
}
const Header = (props) => {
  
  return  (
    <div>
      <h1>
        {props.course.name}
      </h1>
    </div>
  )
}
const Content = (props) => {  
  return (
    <div>
        <Part exercise = {props.parts.parts[0].name} number = {props.parts.parts[0].exercises} />
        <Part exercise = {props.parts.parts[1].name} number = {props.parts.parts[1].exercises} />
        <Part exercise = {props.parts.parts[2].name} number = {props.parts.parts[2].exercises} />
    </div>
  )
}
const Total = (props) => {
  return (
  <div>
    <p>Number of exercises {props.parts.parts[0].exercises + props.parts.parts[1].exercises + props.parts.parts[2].exercises}</p>
  </div>
  )
}


const App = () => {
  
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course} />
      <Content parts={course}/>
      <Total parts={course} />
    </div>
  )
}

export default App
