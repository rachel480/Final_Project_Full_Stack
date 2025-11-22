import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"

const FormContainer = ({ children, onSubmit }) => {
  return (
    <Box className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gradient-to-br">
      <Paper
        elevation={8}
        className="
          backdrop-blur-md 
          bg-[rgba(255,255,255,0.75)] 
          p-10 
          rounded-3xl 
          w-full 
          max-w-md 
          shadow-[0_8px_30px_rgba(0,0,0,0.12)] 
          border 
          border-[rgba(229,145,42,0.62)]
          transition-transform 
          duration-300 
          hover:scale-[1.01]
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