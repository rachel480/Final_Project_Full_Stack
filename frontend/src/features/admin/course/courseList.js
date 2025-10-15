import NavigateButton from "../../../components/navigateButton"
import { useGetAllCoursesByAdminQuery } from "../../course/courseApi"
import CourseCard from "./courseCard"

const CourseList = () => {
  const { data: courses, isLoading, error } = useGetAllCoursesByAdminQuery()

  if (isLoading) return <p>Loading courses...</p>
  if (error) return <p>{error?.data?.message || "Something went wrong"}</p>
  if (!courses?.length) return <p>No courses found</p>

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2 style={{ margin: 0 }}>📚 Courses</h2>
        <NavigateButton navigation={"add"} buttonText={"➕ Add Course"} />
      </div>

      <div>
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  )
}

export default CourseList
