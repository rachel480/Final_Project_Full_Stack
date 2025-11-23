import { Box } from "@mui/material";

const CardContainer = ({ children, className = "" }) => {
  return (
    <Box className="p-6 max-w-3xl max-md:max-w-xl mx-auto relative bg-[rgba(255,265,25,0.2)] max-md:p-3">
      <div
        className={`
          relative max-w-[45vw] max-md:max-w-[70vw] mx-auto mt-8 p-6 
          bg-white/90 rounded-lg shadow-md font-sans 
          ${className}
          max-md:max-w-full max-md:p-4 max-md:mt-4
        `}
      >
        {children}
      </div>
    </Box>
  )
}

export default CardContainer