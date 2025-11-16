import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

const DeleteButton = ({ onClick, title = "מחיקה", className = "" }) => {
  return (
    <Tooltip title={title}>
      <IconButton
        onClick={onClick}
        className={`!bg-[rgba(229,0,0,1)] hover:!bg-[rgba(229,0,0,0.9)] text-white p-1 rounded ${className}`}
      >
        <DeleteIcon className="text-white" />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteButton;