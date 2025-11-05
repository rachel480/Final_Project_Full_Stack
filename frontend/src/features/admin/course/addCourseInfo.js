import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import FormInput from "../../../components/formInput"
import { useDispatch, useSelector } from "react-redux"
import { setCourseInfo, selectWizardCourse, goToStep, selectWizardStep } from "./courseWizardSlice"

const createCourseSchema = z.object({
  name: z.string({ required_error: "Course name is required" }).nonempty("Course name is required"),
  level: z.enum(["Easy", "Medium", "Hard"]),
  categories: z.array(z.string()).optional()
})

const AddCourseInfo = () => {
  const dispatch = useDispatch()
  const step = useSelector(selectWizardStep)
  const courseData = useSelector(selectWizardCourse)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      level: courseData.level || "Easy",
      name: courseData.name || "",
      categories: courseData.categories || []
    }
  })

  const onSubmit = (data) => {
    dispatch(setCourseInfo(data))
    dispatch(goToStep(step + 1))
  }

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
        fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
      }}
    >
      <h1>Add Course (Publish)</h1>

      <FormInput
        label="Course Name"
        type="text"
        register={register("name")}
        error={errors.name?.message}
        placeholder="Enter course name..."
        htmlFor="name"
      />

      <label htmlFor="level" style={{ fontWeight: "bold" }}>Level</label>
      <select
        id="level"
        {...register("level")}
        style={{
          padding: "6px 8px",
          borderRadius: 4,
          border: "1px solid #ccc"
        }}
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <button type="submit" style={{ marginTop: 10 }}>
        save
      </button>
    </form>
  )
}

export default AddCourseInfo