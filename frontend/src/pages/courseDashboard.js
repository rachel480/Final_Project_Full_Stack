import { Outlet, useParams } from "react-router-dom"
import { useGetCourseByIdQuery } from "../features/course/courseApi"
import CourseNav from "../features/course/courseNav"

const CourseDashboard=()=>{
    const {courseId}=useParams()
    
    const {data:course,isLoading,error}=useGetCourseByIdQuery(courseId)
    if(isLoading)
        return <p>Loading course detailes...</p>
    if(error)
        return <p>Error loading course detailes!!</p>
    
    return(
        <div>
            <h1>{course.level} course</h1>
            <CourseNav/>
            <Outlet/>
        </div>
    )
}
export default CourseDashboard