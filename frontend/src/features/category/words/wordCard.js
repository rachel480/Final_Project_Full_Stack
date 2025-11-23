import { useState } from "react"
import speak from "../../../utils/speech"
import useFavoriteWord from "../../favoriteWords/useFavoriteWord"
import { IconButton, Card, CardContent, Typography } from "@mui/material"
import { Favorite, FavoriteBorder, VolumeUp } from "@mui/icons-material"

const WordCard = ({ word }) => {
  const { handleCreateFavoriteWord } = useFavoriteWord()
  const [showWord, setShowWord] = useState(true)

  const handleSpeak = () => {
    speak(word.word)
  }

  return (
    <Card
      className="
        w-80 mx-auto my-6
        max-md:w-64 max-md:my-4
      "
      sx={{
        borderRadius: 3,
        background: showWord
          ? "linear-gradient(to right, #fbc2eb, #a6c1ee)"
          : "linear-gradient(to right, #a8e6cf, #dcedc1)",
        color: "#333",
        textAlign: "center",
        padding: 2,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
      }}
    >
      <CardContent className="flex flex-col items-center justify-center max-md:p-3">
        <Typography
          variant="h5"
          gutterBottom
          className="max-md:text-xl"
        >
          {showWord ? word.word : word.translation}
        </Typography>

        <div className="
          flex items-center justify-center gap-3 mt-4
          max-md:gap-2 max-md:mt-3
        ">
          {showWord && (
            <>
              <IconButton onClick={handleSpeak} color="primary" className="max-md:p-1">
                <VolumeUp />
              </IconButton>

              <IconButton onClick={() => setShowWord(false)} color="secondary" className="max-md:p-1">
                <Typography variant="button" className="max-md:text-xs">
                  עברית ⬅️
                </Typography>
              </IconButton>

              <IconButton
                onClick={() => handleCreateFavoriteWord({ word: word._id })}
                color="error"
                className="max-md:p-1"
              >
                {word.isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </>
          )}

          {!showWord && (
            <IconButton onClick={() => setShowWord(true)} color="secondary" className="max-md:p-1">
              <Typography variant="button" className="max-md:text-xs">
                אנגלית ➡️
              </Typography>
            </IconButton>
          )}
        </div>

      </CardContent>
    </Card>
  )
}

export default WordCard