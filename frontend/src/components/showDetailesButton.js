import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

const ShowDetailsButton = ({ title = "פרטים" ,onClick, className = "" }) => {
  return (
    <div className="relative inline-block">
      <Tooltip title={title}>
        <IconButton
          onClick={onClick}
          className={`!bg-[rgba(82,160,191,1)] text-black p-1 ${className}`}
        >
          <InfoIcon className="text-white" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ShowDetailsButton;
