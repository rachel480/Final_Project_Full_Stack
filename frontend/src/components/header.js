import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const Header = ({ children }) => {
    return (
        <AppBar position="fixed" className="!bg-[rgba(229,145,42,0.62)] shadow-sm z-50 px-6 py-1">
            <Toolbar className='!justify-between  text-white font-bold text-xl'>
                <Box>
                    English city logo
                </Box>
                <Box className='!flex items-center gap-4'>
                    {children}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header