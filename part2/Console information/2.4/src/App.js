const Course = (props) => {
  console.log("Course rendering initiated.");
  let sum = 0
  const course_exercises = props.course["parts"].map(part => part["exercises"])
  console.log(course_exercises);
  sum = props.course["parts"].reduce((accu,part) => accu+part["exercises"],0)
  return (
    <div>
      <h1>Web development curriculum</h1>
      <h3>{props.course["name"]}</h3>
      {props.course["parts"].map(part => 
          <div key={part["id"]}>
            {part["name"]} {part["exercises"]}
          </div>
        )}
        <strong>total of {sum} exercises</strong>
    </div>
  )
}
const Courses = (props) => {
  let table =[[],[]]
  
  console.log("table:",table);
  table[0].push("dasds")
  console.log("table:",table);
  console.log("Courses invoked.");
  console.log(props);
  let output = [[],[]]//Array(props.courses.length).fill([])
  console.log(output);
  for (let i=0; i<props.courses.length; i++) {
    console.log(i);
    console.log(output);
    let helper = []
    for (let j=0; j<props.courses[i]["parts"].length; j++) {
      helper.push(props.courses[i]["parts"][j]["name"])
    }
    console.log("i:",i);
    console.log("output before: ",output);
    console.log("helper: ",helper);
    for (let g = 0; g<helper.length; g++) {
      output[i].push(helper[g])
    }
    
    console.log("output[i]: ",output[i]);
    console.log("output after: ",output);
  } 
  console.log(output);
  console.log(output[0]);
  console.log("before return")
  
  return (
    <div>
      <h1>Web development curriculum</h1>
      <h3>{}</h3>
      {console.log("before map")}
      {props.courses.map(part => 
          <div key={part["id"]}>
            <h1>{part["name"]}</h1>
            <div>{output[1].map(otp => <div key={otp.index}>dab</div>)}</div>  
          </div>
        )}

        <strong>total of exercises</strong>
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

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
    
    <Courses courses={courses} />
    </div>
  )
  
}

export default App