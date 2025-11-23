import { useDispatch, useSelector } from "react-redux";
import { useGetFullCategoryByIdQuery } from "../../category/categoryApi";
import { createChallengeForCategory } from "./services/challengeServices";
import FormTitle from "../../../components/formTitle";
import { Box, Paper } from "@mui/material";
import SubmitButton from "../../../components/submitButton";
import LoadingSpinner from "../../../components/loadingSpinner";
import ErrorMessage from "../../../components/errorMessage";
import InfoMessage from "../../../components/infoMessage";

const AddChallengeInfo = ({ setChallengeInfo, goToStep, selectWizardStep, categoryId }) => {
  const dispatch = useDispatch()
  const step = useSelector(selectWizardStep)

  const { data: category, isLoading, error } = useGetFullCategoryByIdQuery(categoryId)

  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error?.data || "משהו השתבש!!!"} />
  if (!category) return <InfoMessage message="לא נמצאה קטגוריה" />

  const handleChallengeData = () => {
    const challenge = createChallengeForCategory(category);
    dispatch(setChallengeInfo(challenge))
    dispatch(goToStep(step + 1))
  }

  return (
    <Box className="flex flex-col gap-3 w-full max-w-md mx-auto p-4 max-md:p-3">
      <Paper
        elevation={3}
        className="flex flex-col gap-4 p-6 rounded-xl bg-white shadow-md
                   max-md:p-4 max-md:gap-3"
      >
        <FormTitle text="הוספת אתגר" />

        <SubmitButton text={"הוספה"} onClick={handleChallengeData} />
      </Paper>
    </Box>
  )
}

export default AddChallengeInfo