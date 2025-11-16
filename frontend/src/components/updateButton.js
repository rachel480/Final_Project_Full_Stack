import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

const UpdateButton = ({ onClick, title = "עדכון", className = "" }) => {
  return (
    <Tooltip title={title}>
      <IconButton
        onClick={onClick}
        className={`!bg-[rgba(251,192,45,1)] hover:!bg-[rgba(251,192,45,0.9)] text-black p-1 rounded ${className}`}
      >
        <EditIcon className="text-white" />
      </IconButton>
    </Tooltip>
  );
};

export default UpdateButton;
