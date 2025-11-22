import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const Header = ({ children }) => {
    return (
        <AppBar 
            position="fixed" 
            className="!bg-[rgba(229,145,42,0.62)] shadow-sm z-50 px-6 py-1"
        >
            <Toolbar className='!justify-between text-white font-bold text-xl flex flex-row max-md:flex-col gap-0 max-md:gap-0'>
                <Box className="flex justify-start max-md:justify-center">
                    <img 
                        src='/logo.jpg' 
                        alt='english city' 
                        className='h-30 w-40 max-md:w-[18vw] max-md:h-[11vh]' 
                    />
                </Box>
                <Box className='!flex text-2xl max-md:text-xl flex-row items-center gap-4 max-md:gap-2'>
                    {children}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Header