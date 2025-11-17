import SideMenu from "../../components/sideMenu"
import CustomNavLink from "../../components/customNavlink"
import { useGetCourseCategoriesQuery } from "../../features/course/courseApi"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { useGetUserProgressByUserQuery } from "../../features/userProgress/userProgressApi"
import LoadingSpinner from "../../components/loadingSpinner"
import ErrorMessage from "../../components/errorMessage"
import { selectUser } from "../../features/auth/authSlice"

const CourseNavigation = () => {
    const { courseId } = useParams()
    const user = useSelector(selectUser)

    const { data: userProgress, isLoading: loadingUserProgress, error: errorUserProgress } = useGetUserProgressByUserQuery(user._id)
    const { data: categories, isLoading, error } = useGetCourseCategoriesQuery(courseId)

    if (isLoading || loadingUserProgress) return <LoadingSpinner />
    if (error || errorUserProgress) return <ErrorMessage />

    const completedCategories = categories.map((category) => {
        const isCompleted = userProgress?.completedCategories?.some(
            (completed) => completed._id === category._id
        )
        return {...category,isCompleted}
    })

    const allCategoriesFinished = completedCategories?.every(cat => cat.isCompleted)

    return (
        <SideMenu>
            <CustomNavLink to='category'>קטגוריות</CustomNavLink>
            <CustomNavLink to='words'>מילים</CustomNavLink>
            {allCategoriesFinished ? (
                <CustomNavLink to='final-test'>מבחן סופי</CustomNavLink>
            ) : (
                <span className="text-gray-400 cursor-not-allowed">מבחן סופי</span>
            )}
        </SideMenu>
    )
}

export default CourseNavigation