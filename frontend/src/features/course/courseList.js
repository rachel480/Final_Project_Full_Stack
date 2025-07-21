import { useGetAllCoursesQuery } from './courseApi'
import {useNavigate}from 'react-router-dom'

const CourseList = () => {
    const { data: courses, isLoading, error } = useGetAllCoursesQuery()
    const navigate=useNavigate()
    if (isLoading)
        return <p>loading courses...</p>

    if (error)
        return <p>{error?.message}</p>
        

    return (
        <div>
            <h2>courses</h2>
                {
                    courses.map((course)=>{
                        return <button onClick={()=>navigate(`/courseDashboard/${course._id}`)}>{course.level}</button> 
                    })
                }
        </div>
    )
}

export default CourseList