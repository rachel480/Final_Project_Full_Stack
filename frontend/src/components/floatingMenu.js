import { useState } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import MenuIcon from "@mui/icons-material/Menu";

const FloatingMenu = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <Box className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-50">

      {open && (
        <Box className="flex flex-col items-center gap-3 mb-2 transition-all duration-300">
          {children}
        </Box>
      )}

      <Fab
        color="primary"
        onClick={() => setOpen(!open)}
        className="shadow-xl transition-transform duration-300"
        sx={{
          backgroundColor: "rgba(180,22,84,0.9)",
          "&:hover": { backgroundColor:  "rgba(180,22,84,1)"},
        }}
      >
        <MenuIcon />
      </Fab>
    </Box>
  );
};

export default FloatingMenu;