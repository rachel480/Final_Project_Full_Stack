import { IconButton, Typography } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const Pagination = ({ page, setPage, totalPages }) => {
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < (totalPages || 1)) setPage(page + 1);
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      
      <IconButton
        onClick={handlePrevPage}
        disabled={page <= 1}
        className={`transition-all duration-200 rounded-lg p-2 border-2 ${
          page <= 1
            ? "border-gray-300 text-gray-300 cursor-not-allowed"
            : "border-green-400 text-green-600 hover:bg-green-100 hover:border-green-500"
        }`}
      >
        <ArrowBackIos />
      </IconButton>

      <Typography variant="h6" className="font-bold text-gray-700">
        {page} / {totalPages || 1}
      </Typography>

      <IconButton
        onClick={handleNextPage}
        disabled={page >= (totalPages || 1)}
        className={`transition-all duration-200 rounded-lg p-2 border-2 ${
          page >= (totalPages || 1)
            ? "border-gray-300 text-gray-300 cursor-not-allowed"
            : "border-green-400 text-green-600 hover:bg-green-100 hover:border-green-500"
        }`}
      >
        <ArrowForwardIos />
      </IconButton>
    </div>
  )
}

export default Pagination