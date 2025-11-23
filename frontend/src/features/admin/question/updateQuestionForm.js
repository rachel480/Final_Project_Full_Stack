import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useGetFullQuestionByIdQuery, useUpdateQuestionMutation, } from "../../question/questionApi";
import { useGetCategoryWordsQuery } from "../../category/categoryApi";
import FormContainer from "../../../components/formContainer";
import SectionTitle from "../../../components/sectionTitle";
import BackButton from "../../../components/backButton";
import SubmitButton from "../../../components/submitButton";
import DashedBox from "../../../components/dashedBox";
import FormSelect from "../../../components/formSelect";
import { shuffleArray } from "../challenge/services/challengeServices";
import { Box } from "@mui/material";
import LoadingSpinner from "../../../components/loadingSpinner"
import ErrorMessage from "../../../components/errorMessage"
import InfoMessage from "../../../components/infoMessage"

const updateQuestionSchema = z
  .object({
    option1: z.string().min(1, "חובה לבחור אפשרות 1"),
    option2: z.string().min(1, "חובה לבחור אפשרות 2"),
    option3: z.string().min(1, "חובה לבחור אפשרות 3"),
  })
  .superRefine((data, ctx) => {
    const { option1, option2, option3 } = data

    if (option1 === option2) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "אפשרות 1 ואפשרות 2 חייבות להיות שונות", path: ["option1"] })
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "אפשרות 1 ואפשרות 2 חייבות להיות שונות", path: ["option2"] })
    }

    if (option1 === option3) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "אפשרות 1 ואפשרות 3 חייבות להיות שונות", path: ["option1"] })
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "אפשרות 1 ואפשרות 3 חייבות להיות שונות", path: ["option3"] })
    }

    if (option2 === option3) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "אפשרות 2 ואפשרות 3 חייבות להיות שונות", path: ["option2"] })
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "אפשרות 2 ואפשרות 3 חייבות להיות שונות", path: ["option3"] })
    }
  })

const UpdateQuestionForm = () => {
  const { questionId, courseId, categoryId, challengeId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const { data: question, isLoading, error } = useGetFullQuestionByIdQuery(questionId)
  const { data: words, isLoading: loadingWords } = useGetCategoryWordsQuery(categoryId)
  const [updateQuestion] = useUpdateQuestionMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateQuestionSchema),
    defaultValues: { option1: "", option2: "", option3: "" },
  })

  useEffect(() => {
    if (question && words) {
      const filteredOptions = question.options?.filter((opt) => opt._id !== question.correctAnswer._id);
      reset({
        option1: filteredOptions[0]?._id || "",
        option2: filteredOptions[1]?._id || "",
        option3: filteredOptions[2]?._id || "",
      })
    }
  }, [question, words, reset])

  if (isLoading || loadingWords) return <LoadingSpinner/>
  if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"}/>
  if (!question) return <InfoMessage message="לא נמצאה שאלה"/>

  const onSubmit = async (data) => {
    try {
      const options = [data.option1, data.option2, data.option3, question.correctAnswer._id]
      const shuffledOptions = shuffleArray(options)
      await updateQuestion({ id: questionId, options: shuffledOptions }).unwrap()

      toast.success("אפשרויות השאלה עודכנו בהצלחה!", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => {
          const from = location.state?.from || `/user/admin/data/courses/${courseId}/category/${categoryId}/challenge/${challengeId}`
          navigate(from)
        }
      })

    } catch (err) {
      toast.error(err?.data?.message || "Update failed", {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  const validWords = (words || []).filter((w) => w._id !== question.correctAnswer?._id)
  const wordOptions = validWords.map((w) => ({ value: w._id, label: w.word }))

  return (
    <Box className="p-6 max-w-3xl mx-auto relative bg-[rgba(255,265,25,0.2)] max-md:p-3">
      <FormContainer onSubmit={handleSubmit(onSubmit)}>

        <BackButton navigation={location.state?.from || `/user/admin/data/courses/${courseId}/category/${categoryId}/challenge/${challengeId}`} />

        <div className="mt-8">
          <SectionTitle text={`Update Question: ${question.question?.word || question._id}`} />
        </div>

        <DashedBox className="flex-col items-start">
          <p className="!text-[rgba(229,145,42,0.9)] font-semibold mb-2 text-lg">Options:</p>

          <div className="flex flex-col gap-3 w-full">
            <FormSelect
              label="Option 1"
              id="option1"
              register={register("option1")}
              error={errors.option1?.message}
              options={[{ value: "", label: "-- Select option 1 --" }, ...wordOptions]}
            />

            <FormSelect
              label="Option 2"
              id="option2"
              register={register("option2")}
              error={errors.option2?.message}
              options={[{ value: "", label: "-- Select option 2 --" }, ...wordOptions]}
            />

            <FormSelect
              label="Option 3"
              id="option3"
              register={register("option3")}
              error={errors.option3?.message}
              options={[{ value: "", label: "-- Select option 3 --" }, ...wordOptions]}
            />
          </div>
        </DashedBox>

        <SubmitButton text="Save" isLoading={isSubmitting} />
      </FormContainer>
    </Box>
  )
}

export default UpdateQuestionForm