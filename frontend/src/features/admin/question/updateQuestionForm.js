import { useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useGetFullQuestionByIdQuery, useUpdateQuestionMutation } from "../../question/questionApi"
import { useGetCategoryWordsQuery } from "../../category/categoryApi"
import FormContainer from "../../../components/formContainer"
import SectionTitle from "../../../components/sectionTitle"
import BackButton from "../../../components/backButton"
import SubmitButton from "../../../components/submitButton"
import DashedBox from "../../../components/dashedBox"

import { shuffleArray } from "../challenge/services/challengeServices"

// סכמת ולידציה
const updateQuestionSchema = z
  .object({
    option1: z.string().min(1, "Option 1 is required"),
    option2: z.string().min(1, "Option 2 is required"),
    option3: z.string().min(1, "Option 3 is required"),
  })
  .superRefine((data, ctx) => {
    const { option1, option2, option3 } = data
    if (option1 === option2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Option 1 and Option 2 must be different", path: ["option1"] })
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Option 1 and Option 2 must be different", path: ["option2"] })
    }
    if (option1 === option3) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Option 1 and Option 3 must be different", path: ["option1"] })
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Option 1 and Option 3 must be different", path: ["option3"] })
    }
    if (option2 === option3) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Option 2 and Option 3 must be different", path: ["option2"] })
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Option 2 and Option 3 must be different", path: ["option3"] })
    }
  })

const UpdateQuestionForm = () => {
  const { questionId, courseId, categoryId, challengeId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const { data: question, isLoading, error } = useGetFullQuestionByIdQuery(questionId)
  const { data: words, isLoading: loadingWords } = useGetCategoryWordsQuery(categoryId)
  const [updateQuestion] = useUpdateQuestionMutation()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(updateQuestionSchema),
    defaultValues: { option1: "", option2: "", option3: "" },
  })

  useEffect(() => {
    if (question && words) {
      const filteredOptions = question.options?.filter(opt => opt._id !== question.correctAnswer._id)
      reset({
        option1: filteredOptions[0]?._id || "",
        option2: filteredOptions[1]?._id || "",
        option3: filteredOptions[2]?._id || "",
      })
    }
  }, [question, words, reset])

  if (isLoading || loadingWords) return <p className="text-gray-500 text-center mt-8">Loading question details...</p>
  if (error) return <p className="text-red-500 text-center mt-8">{error?.data?.message || "Something went wrong"}</p>
  if (!question) return <p className="text-gray-500 text-center mt-8">No question found</p>

  const onSubmit = async (data) => {
    try {
      const options = [data.option1, data.option2, data.option3, question.correctAnswer._id]
      const shuffledOptions = shuffleArray(options)
      await updateQuestion({ id: questionId, options: shuffledOptions }).unwrap()

      toast.success("Question options updated successfully!", { position: "top-right", autoClose: 3000 })

      setTimeout(() => {
        const from = location.state?.from || `/user/admin/data/courses/${courseId}/category/${categoryId}/challenge/${challengeId}`
        navigate(from)
      }, 3000)
    } catch (err) {
      toast.error(err?.data?.message || "Update failed", { position: "top-right", autoClose: 3000 })
    }
  }

  const validWords = (words || []).filter(w => w._id !== question.correctAnswer?._id)

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <BackButton navigation={location.state?.from || `/user/admin/data/courses/${courseId}/category/${categoryId}/challenge/${challengeId}`} />

      <div className="mt-8">
        <SectionTitle text={`Update Question: ${question.question?.word || question._id}`} />
      </div>

      <DashedBox className="flex-col items-start">
        <p className="!text-[rgba(229,145,42,0.9)] font-semibold mb-2 text-lg">Options:</p>

        <div className="flex flex-col gap-3 w-full">
          {/* Option 1 */}
          <div className="w-full">
            <label className="block font-semibold text-gray-700 mb-1">Option 1</label>
            <select {...register("option1")} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-400">
              <option value="">-- Select option 1 --</option>
              {validWords.map(word => <option key={word._id} value={word._id}>{word.word}</option>)}
            </select>
            {errors.option1 && <p className="text-red-500 text-sm mt-1">{errors.option1.message}</p>}
          </div>

          {/* Option 2 */}
          <div className="w-full">
            <label className="block font-semibold text-gray-700 mb-1">Option 2</label>
            <select {...register("option2")} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-400">
              <option value="">-- Select option 2 --</option>
              {validWords.map(word => <option key={word._id} value={word._id}>{word.word}</option>)}
            </select>
            {errors.option2 && <p className="text-red-500 text-sm mt-1">{errors.option2.message}</p>}
          </div>

          {/* Option 3 */}
          <div className="w-full">
            <label className="block font-semibold text-gray-700 mb-1">Option 3</label>
            <select {...register("option3")} className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-400">
              <option value="">-- Select option 3 --</option>
              {validWords.map(word => <option key={word._id} value={word._id}>{word.word}</option>)}
            </select>
            {errors.option3 && <p className="text-red-500 text-sm mt-1">{errors.option3.message}</p>}
          </div>
        </div>
      </DashedBox>

      <SubmitButton text="Save" isLoading={isSubmitting} />
    </FormContainer>
  )
}

export default UpdateQuestionForm
