import { useDispatch, useSelector } from "react-redux"
import { useGetFullCategoryByIdQuery } from "../../category/categoryApi"
import { createChallengeForCategory } from "./services/challengeServices"
import FormTitle from "../../../components/formTitle"
import { Box, Paper } from "@mui/material"
import SubmitButton from "../../../components/submitButton"

const AddChallengeInfo = ({ setChallengeInfo, goToStep, selectWizardStep, categoryId }) => {

    const dispatch = useDispatch()
    const step = useSelector(selectWizardStep)

    const { data: category, isLoading, error } = useGetFullCategoryByIdQuery(categoryId)

    if (isLoading) return <p>טוען...</p>
    if (error) return <p>{error?.data || "משהו השתבש!!!"}</p>
    if (!category) return <p>לא נמצאה קטגוריה</p>

    const handleChallengeData = () => {
        const challenge = createChallengeForCategory(category)
        dispatch(setChallengeInfo(challenge))
        dispatch(goToStep(step + 1))
    }

    return (
        <Box className="flex flex-col gap-3 w-full max-w-md mx-auto p-4">

            <Paper elevation={3} className="flex flex-col gap-4 p-6 rounded-xl bg-white shadow-md">

                <FormTitle text="הוספת אתגר" />

                <SubmitButton text={'הוספה'} onClick={() => handleChallengeData()}/>
            </Paper>
        </Box>
    )
}

export default AddChallengeInfo