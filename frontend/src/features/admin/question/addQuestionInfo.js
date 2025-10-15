import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { useGetFullCategoryByIdQuery } from "../../category/categoryApi"
import { createQuestionFromWord } from "../challenge/services/challengeServices"
import { setQuestionInfo, goToStep, selectWizardStep } from "./questionWizardSlice"

const questionSchema = z.object({
  wordId: z.string().nonempty("Please select a word"),
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
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      wordId: "",
    },
  })

  const onSubmit = (data) => {
    const word = allWords.find((w) => w._id === data.wordId)
    if (!word) {
      alert("Word not found.")
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

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error loading category</p>

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
        maxWidth: 480,
        margin: "0 auto",
        padding: 14,
        border: "1px solid #eee",
        borderRadius: 8,
        background: "#fff",
        boxShadow: "0 1px 4px rgba(16,24,40,0.04)",
        fontFamily:
          "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
      }}
    >
      <h1>Create Question</h1>

      <label htmlFor="wordId" style={{ fontWeight: "bold" }}>
        Select Word
      </label>

      {availableWords.length ? (
        <select
          id="wordId"
          {...register("wordId")}
          onChange={(e) => {
            const w = availableWords.find((word) => word._id === e.target.value)
            setSelectedWord(w || null)
          }}
          style={{
            padding: 8,
            border: "1px solid #ddd",
            borderRadius: 6,
            fontSize: 15,
          }}
        >
          <option value="">-- Choose a word --</option>
          {availableWords.map((word) => (
            <option key={word._id} value={word._id}>
              {word.word} ({word.translation})
            </option>
          ))}
        </select>
      ) : (
        <p style={{ fontSize: 14, color: "#666" }}>No words available yet</p>
      )}

      {errors.wordId && (
        <p style={{ color: "red", fontSize: 14 }}>{errors.wordId.message}</p>
      )}

      {selectedWord && (
        <div
          style={{
            background: "#f9fafb",
            borderRadius: 6,
            padding: 10,
            border: "1px solid #e5e7eb",
            textAlign: "left",
          }}
        >
          <p>
            <strong>Word:</strong> {selectedWord.word}
          </p>
          <p>
            <strong>Translation:</strong> {selectedWord.translation}
          </p>
          {selectedWord.img && (
            <img
              src={selectedWord.img}
              alt={selectedWord.word}
              style={{
                maxWidth: "100%",
                borderRadius: 6,
                marginTop: 8,
              }}
            />
          )}
        </div>
      )}

      <button
        type="submit"
        style={{
          marginTop: 10,
          padding: "8px 12px",
          borderRadius: 6,
          border: "none",
          background: "#66eba2ff",
          color: "#fff",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Create Question
      </button>
    </form>
  )
}

export default AddQuestionInfo