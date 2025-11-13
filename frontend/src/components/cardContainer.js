import { Box } from "@mui/material";

const CardContainer = ({ children, className = "" }) => {
    return (
        <Box className="p-6 max-w-3xl mx-auto relative bg-[rgba(255,265,25,0.2)]">
            <div className={`relative max-w-[45vw] mx-auto mt-8 p-6 bg-white/90 rounded-lg shadow-md font-sans ${className}`}>
                {children}
            </div>
        </Box>
    )
}

export default CardContainer