import { FaStar } from "react-icons/fa";
import { IconButton, Typography, Box } from "@mui/material";
import { Close } from "@mui/icons-material";

const FavoriteWordDetailesModal = ({ favWord, setShowModal }) => {
  const wordImg = favWord.word.img;

  let imageSrc = "";
  if (wordImg?.data && wordImg?.contentType) {
    imageSrc = `data:image/${wordImg.contentType};base64,${wordImg.data}`;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-green-200 opacity-60 animate-gradient-bg"></div>

      <div className="relative bg-white rounded-3xl shadow-2xl p-6 w-80 md:w-96 flex flex-col items-center text-center z-10">
        
        <IconButton
          onClick={() => setShowModal(null)}
          className="absolute top-3 right-3 bg-pink-400 hover:bg-pink-500 text-white shadow-lg"
          size="small"
        >
          <Close />
        </IconButton>

        <Typography variant="h5" className="font-extrabold mb-2 text-gradient-to-r from-green-400 via-teal-400 to-blue-400">
          {favWord.word.word}
        </Typography>

        <Typography variant="body1" className="text-gray-700 mb-1 font-medium">
          Translation: {favWord.word.translation}
        </Typography>
        <Typography variant="body2" className="text-gray-500 mb-3">
          Category: {favWord.word.categoryName}
        </Typography>

        <Box className="flex items-center justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              color={i < favWord.rateing ? "#FFD700" : "#E5E7EB"}
              className="mx-1 text-2xl hover:scale-110 transition-transform duration-200"
            />
          ))}
        </Box>

        {imageSrc ? (
          <img
            src={imageSrc}
            alt={favWord.word.word}
            className="w-32 h-32 object-contain rounded-xl mb-2 shadow-lg"
          />
        ) : (
          <Typography variant="body2" className="text-gray-400 mb-2 italic">
            לא נמצאה תמונה
          </Typography>
        )}
      </div>
    </div>
  )
}

export default FavoriteWordDetailesModal