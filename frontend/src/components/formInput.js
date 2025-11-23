import TextField from "@mui/material/TextField";

const FormInput = ({ label, htmlFor, type, register, error, placeholder }) => {
  return (
    <div className="mb-4 max-md:mb-3">
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
        inputProps={{
          style: { textAlign: "right" },
        }}
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
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(173, 216, 230, 0.2)",
            "& fieldset": {
              borderColor: "rgba(229,145,42,0.62)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(229,145,42,0.8)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgba(229,145,42,1)",
            },
          },
          fontSize: { xs: "14px", md: "16px" },
        }}
      />
    </div>
  )
}

export default FormInput