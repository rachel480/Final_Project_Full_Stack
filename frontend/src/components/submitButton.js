import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"

const SubmitButton = ({ text, isLoading, onClick, disabled }) => {
  return (
    <Button
      type="submit"
      onClick={onClick}
      disabled={isLoading || disabled}
      fullWidth
      className="flex justify-center items-center py-3 rounded-xl shadow-md" 
      sx={{
        textTransform: "none",
        backgroundColor: "rgba(76, 175, 80, 1)",   
        color: "#fff",                             
        fontWeight: "bold",                         
        fontSize: "1rem",                        
        '&:hover': {
          backgroundColor: "rgba(76, 175, 80, 0.85)",
          color: "#fff",                           
        },
        '&.Mui-disabled': {
          backgroundColor: "rgba(76, 175, 80, 0.5)",
          color: "#fff",
        },
      }}
    >
      {isLoading ? (
        <CircularProgress
          size={24}
          thickness={5}
          sx={{
            color: "white",
          }}
        />
      ) : (
        text
      )}
    </Button>
  )
}

export default SubmitButton
