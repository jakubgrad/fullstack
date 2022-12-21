const Course = (props) => {
  console.log("dasdasdad");
  return (
    <div>
      <h1>{props.course["name"]}</h1>
      {props.course["parts"].map(part => 
          <div key={part["id"]}>
            {part["name"]} {part["exercises"]}
          </div>
        )}
    </div>
  )
}
const App = () => {
  console.log("ad");
 
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <Course course={course} />
  )
  
}

export default App