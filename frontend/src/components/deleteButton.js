import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

const DeleteButton = ({ onClick, title = "מחיקה", className = "" }) => {
  return (
    <Tooltip title={title}>
      <IconButton
        onClick={onClick}
        className={`!bg-[rgba(229,0,0,1)] hover:!bg-[rgba(229,0,0,0.9)] text-white p-1 rounded ${className} w-[44px] h-[44px] max-md:w-[36px] max-md:h-[36px]`}
      >
        <DeleteIcon className="text-white !text-[24px] max-md:!text-[20px]" />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteButton;