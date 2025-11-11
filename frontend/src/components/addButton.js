import { Button } from "@mui/material"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"

const AddButton = ({ text = "הוסף", onClick }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      startIcon={<AddCircleOutlineIcon sx={{ fontSize: 26 }} />}
      className="!bg-[rgba(229,145,42,0.9)] hover:!bg-[rgba(229,145,42,1)] text-white font-bold rounded-xl shadow-md transition-transform duration-200 hover:scale-105"
      sx={{
        textTransform: "none",
        paddingY: "8px",
        paddingX: "16px",
        fontSize: "16px",
      }}
    >
      {text}
    </Button>
  )
}

export default AddButton
