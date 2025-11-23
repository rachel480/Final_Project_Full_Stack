import { FaStar } from "react-icons/fa";
import { CardContent, Typography, Box, IconButton, Tooltip } from "@mui/material";
import { Close } from "@mui/icons-material";

const MyWordDetailsModal = ({ myWord, setShowModal }) => {
  const wordImg = myWord.word.img;
  let imageSrc = "";
  if (wordImg?.data && wordImg?.contentType) {
    imageSrc = `data:image/${wordImg.contentType};base64,${wordImg.data}`;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50 p-8 max-md:p-4">
      <div className="bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-xl shadow-lg p-6 w-full max-w-sm max-md:p-4">
        <Tooltip title="סגור" arrow>
          <IconButton
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white"
            onClick={() => setShowModal(null)}
          >
            <Close />
          </IconButton>
        </Tooltip>

        <CardContent className="flex flex-col items-center gap-2">
          <Typography className="font-bold text-lg max-md:text-base">{myWord.word.word}</Typography>
          <Typography className="text-gray-700 text-sm max-md:text-xs">Translation: {myWord.word.translation}</Typography>
          <Typography className="text-gray-700 text-sm max-md:text-xs">Category: {myWord.word.categoryName}</Typography>

          <Box className="flex justify-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} color={i < myWord.rateing ? "gold" : "lightgray"} size={20} />
            ))}
          </Box>

          {imageSrc ? (
            <img
              src={imageSrc}
              alt={myWord.word.word}
              className="w-32 h-32 object-contain mt-2 rounded-xl max-md:w-24 max-md:h-24"
            />
          ) : (
            <Typography className="text-gray-400 italic mt-2 text-sm max-md:text-xs">לא נמצאה תמונה</Typography>
          )}
        </CardContent>
      </div>
    </div>
  );
};

export default MyWordDetailsModal