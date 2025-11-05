import { useEffect } from "react"
import { useParams, useLocation, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useGetFullChallengeByIdQuery, useUpdateChallengeMutation } from "../../challenge/challengeApi"
import NavigateButton from "../../../components/navigateButton"

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

  if (isLoading) return <p>Loading challenge...</p>
  if (error) return <p>{error?.data?.message || "Something went wrong"}</p>
  if (!challenge) return <p>No challenge found</p>

  const onSubmit = async (data) => {
  try {
    const hasChanges = Object.keys(data).some(
      (key) => data[key] !== challenge[key]
    );

    if (!hasChanges) {
      toast.info('No changes were made', {
        position: "top-right",
        autoClose: 3000,
      })
      return;
    }

    await updateChallenge({ id: challengeId, ...data }).unwrap();
     toast.success(`Category "${data.name}" updated successfully!`, {
        position: "top-right",
        autoClose: 3000,
      })

  } catch (err) {
    console.error(err);
    toast.error(err?.data?.message || "Update failed", {
        position: "top-right",
        autoClose: 3000,
      })
  }
};

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 10,
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <NavigateButton buttonText={'🔙'} navigation={location.state?.from || `/user/admin/data/courses/${courseId}/category/${categoryId}`} />

      <h2>
        <strong>Update Challenge:</strong> {challenge._id}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 15 }}>

        {/* Questions list */}
        <label style={{ fontWeight: "bold" }}>Questions</label>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {(challenge.questions || []).length > 0 ? (
            challenge.questions.map((q) => (
              <Link
                key={q._id}
                to={`/user/admin/data/courses/${courseId}/category/${categoryId}/challenge/${challenge._id}/question/${q._id}/update`}
                state={{ from: location.pathname }}
                style={{ color: "#007bff", textDecoration: "none" }}
              >
                {q.question?.word || q._id} 
              </Link>
            ))
          ) : (
            <p style={{ color: "gray" }}>No questions in this challenge</p>
          )}
        </div>

        {/* Save button */}
        <button
          type="submit"
          style={{
            marginTop: 10,
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            padding: "8px 12px",
            borderRadius: 4,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Save
        </button>
      </form>
    </div>
  )
}

export default UpdateChallengeForm