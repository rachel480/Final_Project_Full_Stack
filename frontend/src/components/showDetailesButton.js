import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

const ShowDetailsButton = ({ title = "פרטים" ,onClick, className = "" }) => {
  return (
    <div className="relative inline-block">
      <Tooltip title={title}>
        <IconButton
          onClick={onClick}
          className={`!bg-[rgba(82,160,191,1)] text-black p-1 ${className} w-[44px] h-[44px] max-md:w-[36px] max-md:h-[36px]`}
        >
          <InfoIcon className="text-white !text-[24px] max-md:!text-[20px]" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ShowDetailsButton;
