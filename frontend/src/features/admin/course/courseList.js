
import NavigateButton from '../../../components/navigateButton'
import { useGetAllCoursesByAdminQuery } from '../../course/courseApi'


import CourseCard from "./courseCard"

const CourseList = () => {
  const { data: courses, isLoading, error } =useGetAllCoursesByAdminQuery()

  if (isLoading) return <p>loading courses...</p>
  if (error) return <p>{error?.data?.message || "something went wrong"}</p>

  return (
    <div>
      <h2>manage courses</h2>
      <NavigateButton navigation={'add'} buttonText={'➕'}/>
      {courses.map((course) => (
        <CourseCard course={course}/>
      ))}
    </div>
  )
}

export default CourseList