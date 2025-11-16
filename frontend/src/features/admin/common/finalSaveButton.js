import { Box, Paper } from "@mui/material"
import FormTitle from "../../../components/formTitle"
import SubmitButton from "../../../components/submitButton"

const FinalSaveButton = ({ onClick, disabled }) => {
  return (
    <Box className="flex flex-col gap-3 w-full max-w-md mx-auto p-4">

      <Paper elevation={3} className="flex flex-col gap-4 p-6 rounded-xl bg-white shadow-md">
        <FormTitle text='שמירה סופית' />
        <SubmitButton onClick={onClick} disabled={disabled} text={'שמירה'}/>
      </Paper>
    </Box>
  )
}

export default FinalSaveButton
