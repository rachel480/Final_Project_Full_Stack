import { useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useGetFullChallengeByIdQuery, useUpdateChallengeMutation } from "../../challenge/challengeApi"
import { Box } from "@mui/material";
import FormContainer from "../../../components/formContainer"
import SectionTitle from "../../../components/sectionTitle"
import SubmitButton from "../../../components/submitButton"
import BackButton from "../../../components/backButton"
import DashedBox from "../../../components/dashedBox"
import CustomLink from "../../../components/customLink"

const updateChallengeSchema = z.object({})

const UpdateChallengeForm = () => {
  const { challengeId, categoryId, courseId } = useParams()
  const location = useLocation()

  const { data: challenge, isLoading, error } = useGetFullChallengeByIdQuery(challengeId)
  const [updateChallenge] = useUpdateChallengeMutation()

  const { handleSubmit, reset } = useForm({
    resolver: zodResolver(updateChallengeSchema),
    defaultValues: {},
  })

  useEffect(() => {
    if (challenge) {
      reset({})
    }
  }, [challenge, reset])

  if (isLoading) return <p className="text-gray-500 text-center mt-8">Loading challenge...</p>
  if (error) return <p className="text-red-500 text-center mt-8">{error?.data?.message || "Something went wrong"}</p>
  if (!challenge) return <p className="text-gray-500 text-center mt-8">No challenge found</p>

  const onSubmit = async (data) => {
    try {
      const hasChanges = Object.keys(data).some(
        (key) => data[key] !== challenge[key]
      )

      if (!hasChanges) {
        toast.info("No changes were made", {
          position: "top-right",
          autoClose: 3000,
        })
        return
      }

      await updateChallenge({ id: challengeId, ...data }).unwrap()
      toast.success(`Challenge updated successfully!`, {
        position: "top-right",
        autoClose: 3000,
      })
    } catch (err) {
      console.error(err)
      toast.error(err?.data?.message || "Update failed", {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  return (
    <Box className="p-6 max-w-3xl mx-auto relative bg-[rgba(255,265,25,0.2)]">
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <BackButton
          navigation={
            location.state?.from ||
            `/user/admin/data/courses/${courseId}/category/${categoryId}`
          }
        />

        <div className="mt-8">
          <SectionTitle text={`Update challenge`} />
        </div>

        <DashedBox className="flex-col items-start mt-6">
          <p className="!text-[rgba(229,145,42,0.9)] font-semibold mb-2 text-lg">
            Questions:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full">
            {(challenge.questions || []).length > 0 ? (
              challenge.questions.map((q) => (
                <CustomLink
                  key={q._id}
                  to={`/user/admin/data/courses/${courseId}/category/${categoryId}/challenge/${challenge._id}/question/${q._id}/update`}
                  state={{ from: location.pathname }}
                  className="block text-left py-2 px-3 border border-gray-300 rounded-lg bg-white hover:bg-[rgba(229,145,42,0.1)] hover:border-[rgba(229,145,42,0.6)] transition-colors duration-200 truncate"
                >
                  {q.question?.word || q._id}
                </CustomLink>
              ))
            ) : (
              <p className="text-gray-500">No questions in this challenge</p>
            )}
          </div>
        </DashedBox>

        <SubmitButton text="Save" />
      </FormContainer>
    </Box>
  )
}

export default UpdateChallengeForm