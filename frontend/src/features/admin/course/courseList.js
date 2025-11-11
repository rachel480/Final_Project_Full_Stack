import { useNavigate } from "react-router-dom"
import { useGetAllCoursesByAdminQuery } from "../../course/courseApi"
import CourseCard from "./courseCard"
import { PiStudentFill } from "react-icons/pi"
import AddButton from "../../../components/addButton"
import { Box } from "@mui/material"
import SectionTitle from "../../../components/sectionTitle"

const CourseList = () => {
  const navigate = useNavigate()
  const { data: courses, isLoading, error } = useGetAllCoursesByAdminQuery()

  if (isLoading) return <p>Loading courses...</p>
  if (error) return <p>{error?.data?.message || "Something went wrong"}</p>

  return (

    <Box className="flex justify-center">
    <Box className="mt-[32px] p-4 ml-0 mr-60 mt-20 w-[calc(100%-240px)] min-h-[calc(100vh-64px)] bg-white/90 p-6 transition-all duration-300 w-[55%]">

      <Box className="flex justify-between items-center mb-6 px-2">

        <SectionTitle text={'קורסים'} Icon={PiStudentFill} />

        <AddButton text="הוסף קורס חדש" onClick={() => navigate("add")} />
      </Box>

      <Box>
        {courses.length ? (
          courses.map((course) => <CourseCard key={course._id} course={course} />)
        ) : (
          <p>No courses found!</p>
        )}
      </Box>

    </Box>
    </Box>
  )
}

export default CourseList