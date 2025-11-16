import { Outlet, useParams } from 'react-router-dom'
import { useGetCourseByIdQuery } from '../../features/course/courseApi'
import CourseNavigation from '../navigation/courseNavigation'
import PageTitle from '../../components/pageTitle'

const CourseLayout = () => {
    const { courseId} = useParams()

    const {data:course, isLoading, error}= useGetCourseByIdQuery(courseId)

    if(isLoading)
        return <p>Loading course detailes....</p>

    if(error)
        return <p>{error?.data?.message || 'Error loading course detailes!!'}</p>
    
    return (
        <div className="mt-[64px] p-4">
            <PageTitle text={`${course.name} קורס`}/>
            <CourseNavigation/>
            <main className="mt-[32px] p-4"><Outlet /></main>
        </div>
    )
}

export default CourseLayout