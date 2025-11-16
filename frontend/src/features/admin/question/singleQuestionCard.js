import { useParams } from "react-router-dom"
import { useGetFullQuestionByIdQuery } from "../../question/questionApi"
import CardContainer from "../../../components/cardContainer"
import BackButton from "../../../components/backButton"
import SectionTitle from "../../../components/sectionTitle"
import QuizIcon from "@mui/icons-material/Quiz"

const SingleQuestionCard = () => {
  const { questionId, challengeId, courseId, categoryId } = useParams()
  const { data: question, isLoading, error } = useGetFullQuestionByIdQuery(questionId)

  if (isLoading) return <p>Loading question...</p>
  if (error) return <p>{error?.data?.message || "Something went wrong"}</p>
  if (!question) return <p>Question not found</p>

  return (
    <CardContainer>
      <BackButton navigation={`/user/admin/data/courses/${courseId}/category/${categoryId}/challenge/${challengeId}`} />
      <SectionTitle text={"Question"} Icon={QuizIcon} />

      <div className="mb-4 p-3 border border-gray-300 rounded-md bg-gray-50">
        <strong className="!text-[rgba(229,145,42,0.9)] font-semibold text-gray-700">Question:</strong>{" "}
        <span className="text-gray-800">{question.question.word}</span>
      </div>

      <div className="mb-4 p-3 border border-gray-300 rounded-md bg-gray-50">
        <strong className="font-semibold text-gray-700 !text-[rgba(229,145,42,0.9)]">Options:</strong>
        <ul className="mt-2 list-disc list-inside text-gray-800">
          {question.options.map((opt) => (
            <li key={opt._id}>{opt.word}</li>
          ))}
        </ul>
      </div>

      <div className="p-3 border border-green-300 rounded-md bg-green-50 text-green-800 font-semibold">
        ✅ Correct Answer: {question.correctAnswer.word}
      </div>
      
    </CardContainer>
  )
}

export default SingleQuestionCard