import { useGetUserProgressByUserQuery } from '../userProgress/userProgressApi'
import SideMenu from '../../components/sideMenu'
import CustomNavLink from '../../components/customNavlink'
import PageTitle from '../../components/pageTitle'

const CourseList = () => {
    const { data: userProgress, isLoading, error } = useGetUserProgressByUserQuery()
    const courses = userProgress?.courses ?? []

    if (isLoading)
        return <p>loading courses...</p>

    if (error)
        return <p>{error?.data?.message || "something went wrong"}</p>

    if (courses.length === 0)
        return <h1>no courses found</h1>

    return (
        <div className="mt-[64px] p-4">
            <PageTitle text={'בחר קורס'}/>
            <SideMenu>
                {
                    courses.map((course) => {
                        return <CustomNavLink to={`/user/course/${course._id}`}>{course.name}</CustomNavLink>
                    })
                }
            </SideMenu>
        </div>
    )
}

export default CourseList