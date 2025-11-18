import { useNavigate } from "react-router-dom"
import { useGetAllCoursesByAdminQuery } from "../../course/courseApi"
import CourseCard from "./courseCard"
import { PiStudentFill } from "react-icons/pi"
import AddButton from "../../../components/addButton"
import { Box } from "@mui/material"
import SectionTitle from "../../../components/sectionTitle"
import CardContainer from "../../../components/cardContainer"
import DashedBox from "../../../components/dashedBox"
import LoadingSpinner from "../../../components/loadingSpinner"
import ErrorMessage from "../../../components/errorMessage"
import InfoMessage from "../../../components/infoMessage"
const CourseList = () => {
  const navigate = useNavigate()
  const { data: courses, isLoading, error } = useGetAllCoursesByAdminQuery()

  if (isLoading) return <LoadingSpinner text="טוען קורסים..."/>
  if (error) return <ErrorMessage message={error?.data?.message || "משהוא השתבש!"}/>

  return (

    <CardContainer>

      <SectionTitle text={'קורסים'} Icon={PiStudentFill} />

      <DashedBox className="flex justify-center">
        <AddButton text="הוסף קורס חדש" onClick={() => navigate("add")}/>
      </DashedBox>

      <Box>
        {courses.length ? (
          courses.map((course) => <CourseCard key={course._id} course={course} />)
        ) : (
          <InfoMessage message="לא נמצאו קורסים"/>
        )}
      </Box>

    </CardContainer>
  )
}

export default CourseList