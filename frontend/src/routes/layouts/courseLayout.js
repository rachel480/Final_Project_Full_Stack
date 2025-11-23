import { Outlet, useParams } from 'react-router-dom'
import { useGetCourseByIdQuery } from '../../features/course/courseApi'
import CourseNavigation from '../navigation/courseNavigation'
import PageTitle from '../../components/pageTitle'
import LoadingSpinner from "../../components/loadingSpinner"
import ErrorMessage from "../../components/errorMessage"

const CourseLayout = () => {
    const { courseId} = useParams()

    const {data:course, isLoading, error}= useGetCourseByIdQuery(courseId)

    if(isLoading) return <LoadingSpinner text="טוען קורס"/>
    if(error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"}/>
    
    return (
        <div>
            <PageTitle text={`${course.name} קורס`}/>
            <CourseNavigation/>
            <main><Outlet /></main>
        </div>
    )
}

export default CourseLayout