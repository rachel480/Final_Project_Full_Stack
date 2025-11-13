import useFavoriteWord from "../favoriteWords/useFavoriteWordFavoriteWord"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"

const WordSectionTable = ({ words, handleSpeak }) => {
  const { handleCreateFavoriteWord, message } = useFavoriteWord()

  return (
    <div className="mt-4">
      <TableContainer
        component={Paper}
        className="rounded-2xl shadow-md bg-gradient-to-r from-pink-50 via-indigo-50 to-teal-50"
      >
        <Table>
          <TableHead>
            <TableRow className="bg-gradient-to-r from-indigo-400 to-purple-500">
              {["#", "מילה", "תרגום", "קטגוריה", "פעולות"].map(
                (header, i) => (
                  <TableCell
                    key={i}
                    className="text-white font-semibold text-center"
                  >
                    {header}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {words.map((word, index) => (
              <TableRow
                key={index}
                className="hover:bg-indigo-100 transition-colors duration-200"
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center" className="font-semibold">
                  {word.word}
                </TableCell>
                <TableCell align="center">{word.translation}</TableCell>
                <TableCell align="center">{word.categoryName}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Listen">
                    <IconButton
                      color="primary"
                      onClick={() => handleSpeak(word.word)}
                    >
                      <VolumeUpIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Add to Favorites">
                    <IconButton
                      onClick={() =>
                        handleCreateFavoriteWord({ word: word._id })
                      }
                    >
                      {word.isFavorite ? (
                        <AiFillHeart color="red" size={20} />
                      ) : (
                        <AiOutlineHeart color="gray" size={20} />
                      )}
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {message && (
        <Typography
          align="center"
          className={`mt-4 font-medium ${
            message.type === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {message.text}
        </Typography>
      )}
    </div>
  )
}

export default WordSectionTable
