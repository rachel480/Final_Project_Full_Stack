import { useParams } from "react-router-dom"
import { useGetWordByIdQuery } from "../../word/wordApi"
import CardContainer from "../../../components/cardContainer"
import BackButton from "../../../components/backButton"
import SectionTitle from "../../../components/sectionTitle"
import SpellcheckIcon from "@mui/icons-material/Spellcheck"
import { Card, CardContent, Typography, Box } from "@mui/material"
import LoadingSpinner from "../../../components/loadingSpinner"
import ErrorMessage from "../../../components/errorMessage"
import InfoMessage from "../../../components/infoMessage"
const SingleWordCard = () => {
  const { wordId, courseId, categoryId } = useParams()
  const { data: word, isLoading, error } = useGetWordByIdQuery(wordId)

  if (isLoading) return <LoadingSpinner text="טוען מילה"/>
  if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"}/>
  if (!word) return <InfoMessage message="לא נמצאה מילה"/>

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