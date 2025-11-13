import { useParams } from "react-router-dom"
import WordCard from "../words/wordCard"
import { useGetCategoryWordsQuery } from "../categoryApi"
import { Typography, Grid } from "@mui/material"
import CustomLink from "../../../components/customLink"

const WordsSection = () => {
  const { categoryId } = useParams()
  const { data: words = [], isLoading, error } = useGetCategoryWordsQuery(categoryId)

  if (isLoading)
    return (
      <Typography variant="h6" className="text-center mt-10">
        Loading words...
      </Typography>
    )

  if (error)
    return (
      <Typography variant="h6" color="error" className="text-center mt-10">
        Error loading words!
      </Typography>
    )

  if (words.length === 0)
    return (
      <Typography variant="h6" className="text-center mt-10">
        No words found
      </Typography>
    )

  return (
    <div className="px-4 pt-8">
      <CustomLink to="/user/my-words/favorites" children="למילים שלי"  />
      
      <Grid container spacing={4} className="mt-4">
        {words.map((wordObj) => (
          <Grid item xs={12} sm={6} md={4} key={wordObj._id}>
            <WordCard word={wordObj} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default WordsSection
