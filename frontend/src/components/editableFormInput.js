import { useState } from "react";
import TextField from "@mui/material/TextField";

const EditableFormInput = ({ label, htmlFor, register, error, placeholder, type = "text" }) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div style={{ marginBottom: "16px" }}>
      <TextField
        id={htmlFor}
        label={label}
        type={type}
        placeholder={placeholder}
        fullWidth
        {...register}
        error={!!error}
        helperText={error}
        variant="outlined"
        InputProps={{
          readOnly: !isEditing,
        }}
        onDoubleClick={() => setIsEditing(true)}
        onBlur={() => setIsEditing(false)}
        InputLabelProps={{
          sx: {
            color: "#000",
            fontWeight: "normal",
            '&.Mui-focused': {
              color: "rgba(229,145,42,0.62)",
              fontWeight: "bold",
            },
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: isEditing ? "#fff" : "rgba(173, 216, 230, 0.2)",
            '& fieldset': {
              borderColor: isEditing ? "rgba(229,145,42,1)" : "rgba(229,145,42,0.62)",
            },
            '&:hover fieldset': {
              borderColor: "rgba(229,145,42,0.8)",
            },
          },
        }}
      />
    </div>
  )
}

export default EditableFormInput;
