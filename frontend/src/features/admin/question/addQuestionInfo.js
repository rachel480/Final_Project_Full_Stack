import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useGetFullCategoryByIdQuery } from "../../category/categoryApi"
import { createQuestionFromWord } from "../challenge/services/challengeServices"
import { setQuestionInfo, goToStep, selectWizardStep } from "./questionWizardSlice"
import FormContainer from "../../../components/formContainer"
import FormTitle from "../../../components/formTitle"
import FormSelect from "../../../components/formSelect"
import SubmitButton from "../../../components/submitButton"
import { Typography, Paper } from "@mui/material"

const questionSchema = z.object({
  wordId: z.string({required_error:"חובה לבחור מילה"}).nonempty("בחר מילה"),
})

const AddQuestionInfo = ({ categoryId }) => {
  const dispatch = useDispatch()
  const step = useSelector(selectWizardStep)

  const { data: category, isLoading, error } = useGetFullCategoryByIdQuery(categoryId)
  const allWords = category?.words || []

  const usedWordIds =
    category?.challenge?.questions?.map((q) =>
      typeof q.question === "object" ? q.question._id : q.question
    ) || []

  const availableWords = allWords.filter((w) => !usedWordIds.includes(w._id))
  const [selectedWord, setSelectedWord] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: { wordId: "" },
  })

  const onSubmit = (data) => {
    const word = allWords.find((w) => w._id === data.wordId)
    if (!word) {
      alert("לא נמצאה מילה.")
      return
    }

    const question = createQuestionFromWord(word, allWords)
    const sliceQuestion = {
      question: question.question,
      correctAnswer: question.correctAnswer,
      options: question.options,
    }

    dispatch(setQuestionInfo(sliceQuestion))
    dispatch(goToStep(step + 1))
  }

  if (isLoading) return <p className="text-gray-500 text-center mt-4">טוען...</p>
  if (error) return <p className="text-red-500 text-center mt-4">שגיאה בטעינת קטגוריה</p>

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormTitle text="הוספת שאלה" />

      <FormSelect
        id="wordId"
        label="בחר מילה"
        options={
          availableWords.length > 0
            ? availableWords.map((word) => ({
              value: word._id,
              label: `${word.word} (${word.translation})`,
            }))
            : [{ value: "", label: "אין מילים זמינות עדיין" }]
        }
        register={register("wordId")}
        error={errors.wordId?.message}
        onChange={(e) => {
          const w = availableWords.find((word) => word._id === e.target.value)
          setSelectedWord(w || null)
        }}
        disabled={availableWords.length === 0}
      />

      {selectedWord && (
        <Paper elevation={1} className="mt-4 p-4 bg-gray-50 rounded-lg">

          <Typography className="font-semibold text-gray-700">
            Word: <span className="font-normal">{selectedWord.word}</span>
          </Typography>

          <Typography className="font-semibold text-gray-700 mt-1">
            Translation: <span className="font-normal">{selectedWord.translation}</span>
          </Typography>

          {selectedWord.img && (
            <img
              src={selectedWord.img}
              alt={selectedWord.word}
              className="mt-2 rounded-md max-w-full"
            />
          )}
          
        </Paper>
      )}

      <SubmitButton text="שמירה" className="mt-4" />
    </FormContainer>
  )
}

export default AddQuestionInfo