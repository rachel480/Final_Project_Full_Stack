import { useParams } from "react-router-dom"
import WordCard from "../words/wordCard"
import { useGetCategoryWordsQuery } from "../categoryApi"
import { Grid } from "@mui/material"
import CustomLink from "../../../components/customLink"
import LoadingSpinner from "../../../components/loadingSpinner"
import ErrorMessage from "../../../components/errorMessage"
import InfoMessage from "../../../components/infoMessage"

const WordsSection = () => {
  const { categoryId } = useParams()
  const { data: words = [], isLoading, error } = useGetCategoryWordsQuery(categoryId)

  if (isLoading) return <LoadingSpinner text="טוען מילים" />
  if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"} />
  if (words.length === 0) return <InfoMessage message="לא נמצאה מילים" />

  return (
    <div className="px-4 pt-8 max-md:px-2 max-md:pt-6">
      <CustomLink to="/user/my-words/favorites" children="למילים שלי" />

      <Grid
        container
        spacing={4}
        className="mt-4 max-md:mt-3 max-md:gap-y-4"
      >
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