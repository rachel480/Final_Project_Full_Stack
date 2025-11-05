import { useParams, useNavigate } from "react-router-dom"
import AddWordForm from "./addWordForm"
import { useGetCategoryByIdQuery } from "../../category/categoryApi"
import { useCreateNewWordMutation } from "../../word/wordApi"
import { useState } from "react"
import NavigateButton from "../../../components/navigateButton"

const AddWordInfo = () => {
  const navigate = useNavigate()
  const { categoryId, courseId } = useParams()
  const { data: category, isLoading, error } = useGetCategoryByIdQuery(categoryId)
  const [createNewWord] = useCreateNewWordMutation()
  const [errorMsg, setErrorMsg] = useState("")

  if (isLoading) return <p>Loading ...</p>
  if (error) return <p>{error?.data || "Something went wrong"}</p>
  if (!category) return <p>Category not found</p>

  const handleData = async (data) => {
    try {
      setErrorMsg(null)
      const addWordData = {
        word: data.word,
        translation: data.translation,
        categoryName: category.name,
        categoryId
      }

      //create word in DB
      await createNewWord(addWordData).unwrap()

      const addQuestion = window.confirm('whould you like to add a question for this word???')
      if (addQuestion)
        navigate(`/user/admin/data/courses/${courseId}/category/${categoryId}/challenge/${category.challenge}/question/add`)
      else
        navigate(`/user/admin/data/courses/${courseId}/category/${categoryId}`)
    }
    catch (err) {
      console.error(err)
      setErrorMsg(err?.data?.message || err.message || "Error creating word")
    }
  }

  return <div>
    <NavigateButton
      navigation={`/user/admin/data/courses/${courseId}/category/${categoryId}`}
      buttonText={"🔙"}
    />

    <AddWordForm handleData={handleData} />
    {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
  </div>
}

export default AddWordInfo