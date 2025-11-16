import { CircularProgress } from "@mui/material";

const LoadingSpinner = ({text = "טוען נתונים..."}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-12 text-gray-600">
      <CircularProgress size={48} thickness={4} color="primary" />
      <p className="mt-4 text-lg font-medium">{text}</p>
    </div>
  )
}

export default LoadingSpinner