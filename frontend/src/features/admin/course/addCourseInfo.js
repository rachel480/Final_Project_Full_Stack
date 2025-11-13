import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import FormInput from "../../../components/formInput"
import { useDispatch, useSelector } from "react-redux"
import { setCourseInfo, selectWizardCourse, goToStep, selectWizardStep } from "./courseWizardSlice"
import FormContainer from "../../../components/formContainer"
import FormTitle from "../../../components/formTitle"
import FormSelect from "../../../components/formSelect" 
import SubmitButton from "../../../components/submitButton"

const createCourseSchema = z.object({
  name: z.string({ required_error: "חובה להכניס שם קורס" }).nonempty("חובה להכניס שם קורס"),
  level: z.enum(["Easy", "Medium", "Hard"]),
  categories: z.array(z.string()).optional(),
})

const AddCourseInfo = () => {
  const dispatch = useDispatch()
  const step = useSelector(selectWizardStep)
  const courseData = useSelector(selectWizardCourse)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      level: courseData.level || "Easy",
      name: courseData.name || "",
      categories: courseData.categories || [],
    },
  })

  const onSubmit = (data) => {
    dispatch(setCourseInfo(data))
    dispatch(goToStep(step + 1))
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormTitle text="הוספת קורס" />

      <FormInput
        label="Course Name"
        type="text"
        register={register("name")}
        error={errors.name?.message}
        placeholder="הכנס שם קורס..."
        htmlFor="name"
      />

      <FormSelect
        id="level"
        label="Level"
        options={[
          { value: "Easy", label: "Easy" },
          { value: "Medium", label: "Medium" },
          { value: "Hard", label: "Hard" },
        ]}
        register={register("level")}
        error={errors.level?.message}
      />

      <SubmitButton text='שמירה' isLoading={isSubmitting}/>

    </FormContainer>
  )
}

export default AddCourseInfo