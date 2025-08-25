import {useNavigate}from 'react-router-dom'
import { useGetUserProgressByUserQuery } from '../userProgress/userProgressApi'

const CourseList = () => {
     const { data: userProgress, isLoading, error } = useGetUserProgressByUserQuery()
    const courses = userProgress?.courses ?? []
    const navigate=useNavigate()
    if (isLoading)
        return <p>loading courses...</p>

    if (error)
         return <p>{error?.data?.message || "something went wrong"}</p>
        
    if(courses.length===0)
        return <h1>no courses found</h1>
    return (
        <div>
            <h2>courses</h2>
                {
                    courses.map((course)=>{
                        return <button onClick={()=>navigate(`/user/course/${course._id}`)}>{course.level}</button> 
                    })
                }
        </div>
    )
}

export default CourseList