import { useState } from "react";
import Box from "@mui/material/Box";

const SideMenu = ({ children }) => {
  const [open, setOpen] = useState(false)

  return (
    <Box
      onMouseEnter={() => { if(children) setOpen(true)}}
      onMouseLeave={() => setOpen(false)}
      className={`
        fixed right-0 
        top-[130px] max-md:top-[160px]  
        text-white text-xl max-md:text-lg shadow-md transition-all duration-300
        bg-gradient-to-b 
        from-pink-400/80 
        via-orange-400/80 
        to-yellow-300/80
        flex flex-col items-center
        ${open ? "w-[170px] max-md:w-[120px]" : "w-[24px]"}
        h-[calc(100%-80px)]
        rounded-l-xl
        font-bold
        z-40
      `}
    >

      {!open && children &&  (
        <Box className="flex flex-col gap-1 cursor-pointer absolute top-1/2 -translate-y-1/2">
          <span className="w-2 h-2 bg-white rounded-full mx-auto"></span>
          <span className="w-2 h-2 bg-white rounded-full mx-auto"></span>
          <span className="w-2 h-2 bg-white rounded-full mx-auto"></span>
        </Box>
      )}

      {open && (
        <Box className="flex flex-col gap-6 max-md:gap-4 p-4 text-right w-full">
          {children}
        </Box>
      )}
    </Box>
  )
}

export default SideMenu