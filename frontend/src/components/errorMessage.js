import { Alert, AlertTitle } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorMessage = ( {message = "משהו השתבש!" }) => {
  
  return (
    <div className="flex justify-center mt-8 px-4">
      <Alert
        icon={<ErrorOutlineIcon fontSize="inherit" />}
        severity="error"
        className="max-w-md w-full shadow-md"
      >
        <AlertTitle>שגיאה</AlertTitle>
        {message}
      </Alert>
    </div>
  )
}

export default ErrorMessage