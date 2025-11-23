
import { useState } from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordInput = ({ label, register, error, placeholder, htmlFor }) => {
  const [show, setShow] = useState(false)

  return (
    <TextField
      label={label}
      type={show ? "text" : "password"}
      fullWidth
      placeholder={placeholder}
      error={!!error}
      helperText={error || ""}
      {...register}
      id={htmlFor}
      InputLabelProps={{
        sx: {
          color: "black",
          fontWeight: "normal",
          "&.Mui-focused": {
            color: "rgba(229,145,42,0.62)",
            fontWeight: "bold",
          },
        },
      }}
      sx={{
        fontSize: { xs: "14px", md: "16px" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#FF8A00",
          },
          "&:hover fieldset": {
            borderColor: "#FF8A00",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#FF8A00",
          },
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShow(!show)}>
              {show ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}

export default PasswordInput