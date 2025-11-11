import { useParams } from "react-router-dom"
import { useGetWordByIdQuery } from "../../word/wordApi"
import CardContainer from "../../../components/cardContainer"
import BackButton from "../../../components/backButton"
import SectionTitle from "../../../components/sectionTitle"
import SpellcheckIcon from "@mui/icons-material/Spellcheck"
import { Card, CardContent, Typography, Box } from "@mui/material"

const SingleWordCard = () => {
  const { wordId, courseId, categoryId } = useParams()
  const { data: word, isLoading, error } = useGetWordByIdQuery(wordId)

  if (isLoading)
    return <p className="text-gray-500 text-center mt-8">Loading word...</p>
  if (error)
    return (
      <p className="text-red-500 text-center mt-8">
        {error?.data?.message || "Something went wrong"}
      </p>
    )
  if (!word)
    return <p className="text-gray-500 text-center mt-8">Word not found</p>

  const wordImg = word.img
  let imageSrc = ""
  if (wordImg?.data && wordImg?.contentType) {
    imageSrc = `data:image/${wordImg.contentType};base64,${wordImg.data}`
  }

  return (
    <CardContainer>

      <BackButton navigation={`/user/admin/data/courses/${courseId}/category/${categoryId}`}/>
      <SectionTitle text="Word" Icon={SpellcheckIcon} />

      <Card className="mt-4 w-full max-w-md mx-auto shadow-md rounded-2xl border border-gray-200 bg-gray-50 hover:shadow-lg transition-shadow duration-300">
        
        <CardContent>

          <Box className="space-y-3">
            <Typography className="text-gray-700">
              <strong className="!text-[rgba(229,145,42,0.9)]">Word:</strong> {word.word}
            </Typography>

            <Typography className="text-gray-700">
              <strong className="!text-[rgba(229,145,42,0.9)]">Translation:</strong> {word.translation}
            </Typography>

            <Typography className="text-gray-700">
              <strong className="!text-[rgba(229,145,42,0.9)]">Category:</strong> {word.categoryName}
            </Typography>

            {imageSrc ? (
              <Box className="flex justify-center mt-5">
                <img
                  src={imageSrc}
                  alt={word.word}
                  className="w-48 h-48 object-contain rounded-xl border border-gray-200 shadow-sm"
                />
              </Box>
            ) : (
              <Typography
                className="text-gray-400 italic text-center mt-5"
                variant="body2"
              >
                No image found
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </CardContainer>
  )
}

export default SingleWordCard