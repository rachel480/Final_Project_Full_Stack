import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"

const FormContainer = ({ children, onSubmit }) => {
  return (
    <Box className="flex justify-center items-center min-h-screen px-4">
      <Paper
        elevation={6}
        className="
          p-8
          rounded-2xl
          w-full
          max-w-md
          shadow-md
        "
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {children}
        </form>
      </Paper>
    </Box>
  )
}

export default FormContainer