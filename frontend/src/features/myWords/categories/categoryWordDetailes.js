import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { CardContent, Typography, Box } from "@mui/material";
import UpdateWordForm from "../words/updateWordForm";
import useMyWord from "../words/useMyWord";
import UpdateButton from "../../../components/updateButton";
import DeleteButton from "../../../components/deleteButton";

const CategoryWordDetailes = ({ word }) => {
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return window.btoa(binary);
  };

  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const { handleDeleteMyWord } = useMyWord();
  const [hovered, setHovered] = useState(false);

  const wordImg = word.word.img || word.img;
  let imageSrc = "";
  if (wordImg?.data && wordImg?.contentType) {
    const base64Data = arrayBufferToBase64(wordImg.data.data || wordImg.data);
    imageSrc = `data:image/${wordImg.contentType};base64,${base64Data}`;
  }

  return (
    <div
      className={`w-72 mx-auto my-4 cursor-pointer rounded-xl shadow-md transition-transform duration-300
                  ${hovered ? 'bg-gradient-to-r from-[#a8e6cf] to-[#56c596]' : 'bg-gradient-to-r from-[#c1f0d1] to-[#81d49c]'}
                  hover:translate-y-[-5px] hover:shadow-xl
                  max-md:w-60`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardContent className="flex flex-col items-center justify-center gap-2 p-4 max-md:p-3">

        <Typography className="font-bold text-gray-800 mb-1 text-base max-md:text-sm">{word.word.word}</Typography>
        <Typography className="text-gray-700 text-sm max-md:text-xs">Translation: {word.word.translation}</Typography>
        <Typography className="text-gray-700 text-sm max-md:text-xs">Category: {word.word.categoryName}</Typography>

        <Box className="flex gap-1 mt-2 p-1 rounded-lg border-2 border-yellow-400 bg-yellow-100 max-md:p-0.5">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} color={i < word.rateing ? "gold" : "lightgray"} />
          ))}
        </Box>

        {imageSrc ? (
          <div className="flex justify-center mt-5">
            <img
              src={imageSrc}
              alt={word.word.word}
              className="w-48 h-48 object-contain rounded-xl border border-gray-200 shadow-sm max-md:w-36 max-md:h-36"
            />
          </div>
        ) : (
          <Typography className="text-gray-400 italic text-center mt-5 text-sm max-md:text-xs">
            לא נמצאה תמונה
          </Typography>
        )}

        <div className="flex items-center justify-center gap-2 mt-3 max-md:flex-col max-md:gap-1">
          <UpdateButton onClick={() => setShowUpdateForm(true)} />
          <DeleteButton onClick={() => handleDeleteMyWord({ id: word._id })} />
        </div>

      </CardContent>

      {showUpdateForm && <UpdateWordForm setShowUpdateForm={setShowUpdateForm} myWord={word} />}
    </div>
  );
};

export default CategoryWordDetailes