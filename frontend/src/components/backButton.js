import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tooltip from '@mui/material/Tooltip';

const BackButton = ({ navigation, buttonText = "חזרה" }) => {
  const navigate = useNavigate()

  return (
    <Tooltip title={buttonText}>
        
      <IconButton
        onClick={() => navigate(navigation)}
        sx={{
          position: 'absolute',
          top: 16,
          left: 16,
          backgroundColor: 'rgba(229,145,42,0.8)',
          color: '#fff',
          '&:hover': {
            backgroundColor: 'rgba(229,145,42,1)',
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  )
}

export default BackButton
