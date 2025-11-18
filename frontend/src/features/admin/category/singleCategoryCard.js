import { useParams, useNavigate } from "react-router-dom"
import { useGetFullCategoryByIdQuery } from "../../category/categoryApi"
import { useState } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ConfirmDeleteModal from "../../../components/confirmDeleteModal"
import { useDeleteChallengeMutation } from "../../challenge/challengeApi"
import { useDeletewordMutation } from "../../word/wordApi"
import CardContainer from "../../../components/cardContainer"
import BackButton from "../../../components/backButton"
import SectionTitle from "../../../components/sectionTitle"
import LabelIcon from '@mui/icons-material/Label';
import CardRow from "../../../components/cardRow"
import DashedBox from "../../../components/dashedBox"
import AddButton from "../../../components/addButton"
import TagLabel from "../../../components/tagLable"
import DeleteButton from "../../../components/deleteButton"
import UpdateButton from "../../../components/updateButton"
import ShowDetailsButton from "../../../components/showDetailesButton"
import LoadingSpinner from "../../../components/loadingSpinner"
import ErrorMessage from "../../../components/errorMessage"
import InfoMessage from "../../../components/infoMessage"

const SingleCategoryCard = () => {
  const { categoryId, courseId } = useParams()
  const { data: category, isLoading, error } = useGetFullCategoryByIdQuery(categoryId)
  const navigate = useNavigate()

  const [deleteChallenge] = useDeleteChallengeMutation()
  const [deleteWord] = useDeletewordMutation()

  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedChallenge, setSelectedChallenge] = useState(null)
  const [selectedWord, setSelectedWord] = useState(null)

  const handleDeleteChallenge = async () => {
    if (!selectedChallenge) return
    setShowConfirm(false)

    try {
      await deleteChallenge({ id: selectedChallenge._id }).unwrap()
      toast.success(`קטגוריה נמחקה בהצלחה✅`, {
        position: "top-right",
        autoClose: 3000,
        onClose:()=>navigate(`/user/admin/data/courses/${courseId}/category/${categoryId}`)
      })
      
    } catch (err) {
      console.error("Delete challenge error:", err)
      const errorMsg = err?.data?.message || "ארעה שגיאה במחיקה ❌"
      toast.error(errorMsg, { position: "top-right", autoClose: 4000 })
    } finally {
      setSelectedChallenge(null)
    }
  }

  const handleDeleteWord = async () => {
    if (!selectedWord) return
    setShowConfirm(false)

    try {
      await deleteWord({ id: selectedWord._id }).unwrap()
      toast.success(`המילה "${selectedWord.word}" נמחקה בהצלחה ✅`, {
        position: "top-right",
        autoClose: 3000,
        onClose:()=>navigate(`/user/admin/data/courses/${courseId}/category/${categoryId}`)
      })
    } catch (err) {
      console.error("Delete word error:", err)
      const errorMsg = err?.data?.message || "ארעה שגיעה במחיקה❌"
      toast.error(errorMsg, { position: "top-right", autoClose: 4000 })
    } finally {
      setSelectedWord(null)
    }
  }

  if (isLoading) return <LoadingSpinner text="טוען קטגוריה"/>
  if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"}/>
  if (!category) return <InfoMessage message={"לא נמצאה קטגוריה"}/>

  return (
    <CardContainer>

      <BackButton navigation={`/user/admin/data/courses/${courseId}`} />
      <SectionTitle text={category.name} Icon={LabelIcon} />

      {category.challenge ? (
        <CardRow>
          <TagLabel text={'Challenge'} />
          <div className="flex gap-2">
            <ShowDetailsButton onClick={() => navigate(`challenge/${category.challenge._id}`)} />
            <DeleteButton onClick={() => { setSelectedChallenge(category.challenge); setShowConfirm(true) }} />
            <UpdateButton onClick={() => navigate(`challenge/${category.challenge._id}/update`)} />
          </div>
        </CardRow>
      ) : (
        <DashedBox>
          <p className="!text-[rgba(229,145,42,0.9)] text-lg">Challenge:</p>
          <AddButton onClick={() => navigate(`challenge/add`)} text="הוסף אתגר חדש" />
        </DashedBox>
      )}

      <DashedBox>
        <p className="!text-[rgba(229,145,42,0.9)] text-lg">Words:</p>
        <AddButton onClick={() => navigate(`words/add`)} text="הוסף מילה חדשה" />
      </DashedBox>

      {category.words.map(word => (
        <CardRow key={word._id}>
          <TagLabel text={word.word} />
          <div className="flex gap-2">
            <ShowDetailsButton onClick={() => navigate(`words/${word._id}`)} />
            <DeleteButton onClick={() => { setSelectedWord(word); setShowConfirm(true) }} />
            <UpdateButton onClick={() => navigate(`words/${word._id}/update`)} />
          </div>
        </CardRow>
      ))}

      {showConfirm && (selectedChallenge || selectedWord) && (
        <ConfirmDeleteModal
          itemName={selectedChallenge ? "Challenge" : selectedWord.word}
          handleDelete={selectedChallenge ? handleDeleteChallenge : handleDeleteWord}
          setShowConfirm={setShowConfirm}
        />
      )}

    </CardContainer>
  )
}

export default SingleCategoryCard