import { useParams } from "react-router-dom"
import { useGetCategoryChallengeQuery } from "../categoryApi"
import EasyChallenge from "./easy_challenge/easyChallenge"
import MediumChallenge from "./medium_challenge/mediumChallenge"
import HardChallenge from "./hard_challenge/hardChallenge"
import LoadingSpinner from "../../../components/loadingSpinner"
import ErrorMessage from "../../../components/errorMessage"
import { useGetCourseByIdQuery } from "../../course/courseApi"

const ChallengeRoot = () => {
    const { categoryId, courseId } = useParams()
    const { data: challengeData, isLoading, error } = useGetCategoryChallengeQuery(categoryId)
    const { data: course, isLoading: isLoadingCourse, error: errorCourse } = useGetCourseByIdQuery(courseId)

    if (isLoading || isLoadingCourse) return <LoadingSpinner />
    if (error|| errorCourse) return <ErrorMessage message="שגיאה בטעינת האתגר" />

    const level = course.level

    switch (level) {
        case "Easy":
            return <EasyChallenge challenge={challengeData} />
        case "Medium":
            return <MediumChallenge challenge={challengeData} />
        case "Hard":
            return <HardChallenge challenge={challengeData} />
        default:
            return <ErrorMessage message="רמת קושי לא מוגדרת" />
    }
}

export default ChallengeRoot