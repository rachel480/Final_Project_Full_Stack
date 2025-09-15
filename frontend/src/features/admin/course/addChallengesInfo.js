import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from "react-redux"
import { selectWizardChallenge, setChallengeInfo, goToStep } from "./courseWizardSlice"
import FormInput from "../../../components/formInput"

const challengeSchema = z.object({
  challenge: z.string({ required_error: "Challenge is required" }).nonempty("Challenge must contain at least 1 character"),
})

const AddChallengesInfo = () => {
  const dispatch = useDispatch()
  const challengeData = (useSelector(selectWizardChallenge)).join(' ,')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(challengeSchema),
    defaultValues: { challenge: challengeData }
  })

  const onSubmit = (data) => {
    dispatch(setChallengeInfo(data.challenge))
    dispatch(goToStep(4))
  }

  return (
    <div>
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
        <h1>Add Challenges</h1>

        <FormInput
          label="Challenge"
          type="text"
          register={register("challenge")}
          error={errors.challenge?.message}
          placeholder="Enter challenge..."
          htmlFor="challenge"
        />

        <button type="submit" style={{ marginTop: 10, background: "green", color: "white" }}>
          save
        </button>

      </form>
    </div>
  )
}

export default AddChallengesInfo