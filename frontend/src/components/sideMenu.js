import Box from '@mui/material/Box';

const SideMenu = ({ children }) => {
  return (
    <Box
      className={`fixed right-0 bg-[rgba(5,168,183,0.58)] text-white shadow-md transition-all duration-300`}
      style={{
        top: 85, 
        height: 'calc(100% - 80px)',
      }}
    >
      <Box className="flex flex-col gap-4 p-4 text-right">
        {children}
      </Box>
    </Box>
  )
}

export default SideMenu