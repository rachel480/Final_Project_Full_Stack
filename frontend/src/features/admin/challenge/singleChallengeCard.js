import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useGetFullChallengeByIdQuery } from "../../challenge/challengeApi"
import { useState } from "react"
import { useDeleteQuestionMutation } from "../../question/questionApi"
import ConfirmDeleteModal from "../../../components/confirmDeleteModal"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import CardContainer from "../../../components/cardContainer"
import BackButton from "../../../components/backButton"
import SectionTitle from "../../../components/sectionTitle"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DashedBox from "../../../components/dashedBox"
import AddButton from "../../../components/addButton"
import CardRow from "../../../components/cardRow"
import TagLabel from "../../../components/tagLable"
import ShowDetailsButton from "../../../components/showDetailesButton"
import DeleteButton from "../../../components/deleteButton"
import UpdateButton from "../../../components/updateButton"

const SingleChallengeCard = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const { challengeId, courseId, categoryId } = useParams()
  const { data: challenge, isLoading, error } = useGetFullChallengeByIdQuery(challengeId)

  const [deleteQuestion] = useDeleteQuestionMutation()
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)

  const handleDeleteQuestion = async () => {
    if (!selectedQuestion) return
    setShowConfirm(false)

    try {
      await deleteQuestion({ id: selectedQuestion._id }).unwrap()
      toast.success(`Question "${selectedQuestion.question.word}" deleted successfully ✅`, {
        position: "top-right",
        autoClose: 3000,
      })
    } catch (err) {
      console.error("Delete question error:", err)
      const errorMsg = err?.data?.message || "Failed to delete question ❌"
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 4000,
      })
    } finally {
      setSelectedQuestion(null)
    }
  }

  if (isLoading) return <p>Loading challenge...</p>
  if (error) return <p>{error?.data?.message || "Something went wrong"}</p>
  if (!challenge) return <p>Challenge not found</p>

  return (
    <CardContainer>

      <BackButton navigation={`/user/admin/data/courses/${courseId}/category/${categoryId}`} />
      <SectionTitle text={'Challenge'} Icon={EmojiEventsIcon} />

      <DashedBox>
        <p className="!text-[rgba(229,145,42,0.9)] text-lg">Questions:</p>
        <AddButton onClick={() => navigate(`question/add`)} text="הוסף שאלה חדשה" />
      </DashedBox>

      {challenge.questions.map((question) => (
        <CardRow key={question._id}>

          <TagLabel text={`${question.question.word}?`} />

          <div className="flex gap-2">
            <ShowDetailsButton onClick={() => navigate(`question/${question._id}`)} />
            <DeleteButton onClick={() => { setSelectedQuestion(question); setShowConfirm(true) }} />
            <UpdateButton onClick={() => navigate(`question/${question._id}/update`, { state: { from: location.pathname } })} />
          </div>

        </CardRow>
      ))}

      {showConfirm && selectedQuestion && (
        <ConfirmDeleteModal
          itemName={selectedQuestion.question.word}
          handleDelete={handleDeleteQuestion}
          setShowConfirm={setShowConfirm}
        />
      )}

    </CardContainer>
  )
}

export default SingleChallengeCard
