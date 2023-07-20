const Course = ({ course }) => {
    return (
        <div>
            <h2>{course.name}</h2>
            {course.parts.map(p =>
                <p key={p.id}>{p.name} {p.exercises}</p>)}
            <p style={{ fontWeight: 'bold' }}>Total of {course.parts.reduce(function (sum, order) {
                return sum + order.exercises
            }, 0)} exercises</p>
        </div>
    )
}

export default Course