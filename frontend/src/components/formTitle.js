import { Typography } from "@mui/material"

const FormTitle = ({ text }) => {
  return (
    <Typography
      variant="h4"
      className="text-center font-semibold text-xxxl font-bold max-md:text-2xl"
      sx={{ color: "rgba(229,145,42,0.62)" }}
    >
      {text}
    </Typography>
  )
}

export default FormTitle