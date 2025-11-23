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
        className="max-md:!top-5 max-md:!left-4"
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
        <ArrowBackIcon className="max-md:!text-[20px]" />
      </IconButton>
    </Tooltip>
  )
}

export default BackButton