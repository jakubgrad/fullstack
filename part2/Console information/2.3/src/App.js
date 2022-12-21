const Course = (props) => {
  console.log("Course rendering initiated.");
  let sum = 0
  const course_exercises = props.course["parts"].map(part => part["exercises"])
  console.log(course_exercises);
  sum = props.course["parts"].reduce((accu,part) => accu+part["exercises"],0)
  return (
    <div>
      <h1>{props.course["name"]}</h1>
      {props.course["parts"].map(part => 
          <div key={part["id"]}>
            {part["name"]} {part["exercises"]}
          </div>
        )}
        <strong>total of {sum} exercises</strong>
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