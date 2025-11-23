import useFavoriteWord from "../favoriteWords/useFavoriteWord"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from "@mui/material"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"

const WordSectionTable = ({ words, handleSpeak }) => {
  const { handleCreateFavoriteWord } = useFavoriteWord()

  return (
    <div className="mt-4 max-md:mt-2">
      <TableContainer
        component={Paper}
        className="rounded-2xl shadow-md bg-gradient-to-r from-pink-50 via-indigo-50 to-teal-50 max-md:px-2"
      >
        <Table size="small">
          <TableHead>
            <TableRow className="bg-gradient-to-r from-indigo-400 to-purple-500">
              {["#", "מילה", "תרגום", "קטגוריה", "פעולות"].map((header, i) => (
                <TableCell
                  key={i}
                  className="text-white font-semibold text-center max-md:text-xs"
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {words.map((word, index) => (
              <TableRow
                key={index}
                className="hover:bg-indigo-100 transition-colors duration-200"
              >
                <TableCell align="center" className="max-md:text-xs">{index + 1}</TableCell>
                <TableCell align="center" className="font-semibold max-md:text-xs">{word.word}</TableCell>
                <TableCell align="center" className="max-md:text-xs">{word.translation}</TableCell>
                <TableCell align="center" className="max-md:text-xs">{word.categoryName}</TableCell>

                <TableCell align="center">
                  <Tooltip title="Listen">
                    <IconButton
                      color="primary"
                      onClick={() => handleSpeak(word.word)}
                      size="small"
                    >
                      <VolumeUpIcon className="max-md:text-sm" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Add to Favorites">
                    <IconButton
                      onClick={() => handleCreateFavoriteWord({ word: word._id })}
                      size="small"
                    >
                      {word.isFavorite ? (
                        <AiFillHeart color="red" size={18} />
                      ) : (
                        <AiOutlineHeart color="gray" size={18} />
                      )}
                    </IconButton>
                  </Tooltip>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default WordSectionTable