import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useGetFullCourseByIdQuery, useUpdateCourseMutation } from "../../course/courseApi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import FormContainer from "../../../components/formContainer";
import FormInput from "../../../components/formInput";
import SubmitButton from "../../../components/submitButton";
import CustomLink from "../../../components/customLink";
import BackButton from "../../../components/backButton";
import DashedBox from "../../../components/dashedBox";
import SectionTitle from "../../../components/sectionTitle";
import FormSelect from "../../../components/formSelect";
import { Box } from "@mui/material";
import LoadingSpinner from "../../../components/loadingSpinner"
import ErrorMessage from "../../../components/errorMessage"
import InfoMessage from "../../../components/infoMessage"

const updateCourseSchema = z.object({
  name: z.string({ required_error: "חובה להכניס שם קורס" }).min(1, "חובה להכניס שם קורס"),
  level: z.enum(["Easy", "Medium", "Hard"], { required_error: "חובה לבחור רמה" }),
  status: z.enum(["draft", "published"], { required_error: "חובה לבחור סטטוס" }),
})

const UpdateCourseForm = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const { data: course, isLoading, error } = useGetFullCourseByIdQuery(courseId)
  const [updateCourse] = useUpdateCourseMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateCourseSchema),
    defaultValues: {
      name: "",
      level: "Easy",
      status: "draft",
    },
  })

  useEffect(() => {
    if (course) {
      reset({
        name: course.name,
        level: course.level,
        status: course.status,
      });
    }
  }, [course, reset])

 if (isLoading) return <LoadingSpinner text="טוען קורס..."/>
  if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"}/>
  if (!course) return <InfoMessage message="לא נמצא קורס"/>

  const onSubmit = async (data) => {
    try {
      await updateCourse({ id: courseId, ...data }).unwrap()
      toast.success(`קורס עודכן בהצלחה!!`, {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate("/user/admin/data/courses")
      })
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "עדכון נכשל", {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  return (
    <Box className="p-6 max-w-3xl mx-auto relative bg-[rgba(255,265,25,0.2)]">
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <BackButton navigation="/user/admin/data/courses" />

        <div className="mt-8">
          <SectionTitle text={`${course.name}עדכון קורס `} />
        </div>

        <FormInput
          label="Course Name"
          type="text"
          register={register("name")}
          error={errors.name?.message}
          placeholder="הכנס שם קורס..."
          htmlFor="name"
        />

        <FormSelect
          label="Level"
          id="level"
          register={register("level")}
          error={errors.level?.message}
          options={[
            { value: "", label: "-- בחר רמת קורס --" },
            { value: "Easy", label: "Easy" },
            { value: "Medium", label: "Medium" },
            { value: "Hard", label: "Hard" },
          ]}
        />

        <FormSelect
          label="Status"
          id="status"
          register={register("status")}
          error={errors.status?.message}
          options={[
            { value: "", label: "-- בחר סטטוס --" },
            { value: "draft", label: "Draft" },
            { value: "published", label: "Published" },
          ]}
        />

        <DashedBox className="flex-col items-start">
          <p className="!text-[rgba(229,145,42,0.9)] font-semibold mb-2 text-lg">Categories:</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
            {(course.categories || []).map((category) => {
              const catId = typeof category === "string" ? category : category._id
              const catName = typeof category === "string" ? category : category.name

              return (
                <CustomLink
                  key={catId}
                  to={`/user/admin/data/courses/${course._id}/category/${catId}/update`}
                  state={{ from: location.pathname }}
                  className="block text-left py-2 px-3 border border-gray-300 rounded-lg bg-white hover:bg-[rgba(229,145,42,0.1)] hover:border-[rgba(229,145,42,0.6)] transition-colors duration-200 truncate"
                >
                  {catName}
                </CustomLink>
              )
            })}
          </div>
        </DashedBox>

        <SubmitButton text="Save" isLoading={isSubmitting} />
      </FormContainer>
    </Box>
  )
}

export default UpdateCourseForm