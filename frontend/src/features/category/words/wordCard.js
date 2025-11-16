
import { useState } from "react"
import speak from "../../../utils/speech"
import useFavoriteWord from "../../favoriteWords/useFavoriteWordFavoriteWord"
import { IconButton, Card, CardContent, Typography } from "@mui/material"
import { Favorite, FavoriteBorder, VolumeUp } from "@mui/icons-material"

const WordCard = ({ word }) => {
  const { handleCreateFavoriteWord, message } = useFavoriteWord()
  const [showWord, setShowWord] = useState(true)

  const handleSpeak = () => {
    speak(word.word)
  }

  return (
    <Card
      className="w-80 mx-auto my-6"
      sx={{
        borderRadius: 3,
        background: showWord ? "linear-gradient(to right, #fbc2eb, #a6c1ee)" : "linear-gradient(to right, #a8e6cf, #dcedc1)",
        color: "#333",
        textAlign: "center",
        padding: 2,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
      }}
    >
      <CardContent className="flex flex-col items-center justify-center">
        <Typography variant="h5" gutterBottom>
          {showWord ? word.word : word.translation}
        </Typography>

        <div className="flex items-center justify-center gap-3 mt-4">
          {showWord && (
            <>
              <IconButton onClick={handleSpeak} color="primary">
                <VolumeUp />
              </IconButton>
              <IconButton onClick={() => setShowWord(false)} color="secondary">
                <Typography variant="button">עברית ⬅️</Typography>
              </IconButton>
              <IconButton onClick={() => handleCreateFavoriteWord({ word: word._id })} color="error">
                {word.isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
            </>
          )}

          {!showWord && (
            <IconButton onClick={() => setShowWord(true)} color="secondary">
              <Typography variant="button">אנגלית ➡️</Typography>
            </IconButton>
          )}
        </div>

        {message && (
          <Typography
            variant="body2"
            color={message.type === "error" ? "error" : "success.main"}
            sx={{ mt: 2 }}
          >
            {message.text}
          </Typography>
        )}
      </CardContent>
    </Card>
  )
}

export default WordCard
