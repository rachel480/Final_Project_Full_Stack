import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useGetFullCategoryByIdQuery, useUpdateCategoryMutation, } from "../../category/categoryApi";
import { useGetAllCoursesQuery } from "../../course/courseApi";
import FormContainer from "../../../components/formContainer";
import SectionTitle from "../../../components/sectionTitle";
import FormInput from "../../../components/formInput";
import FormSelect from "../../../components/formSelect";
import SubmitButton from "../../../components/submitButton";
import BackButton from "../../../components/backButton";
import CustomLink from "../../../components/customLink";
import DashedBox from "../../../components/dashedBox";
import { Box } from "@mui/material";
import LoadingSpinner from "../../../components/loadingSpinner"
import ErrorMessage from "../../../components/errorMessage"
import InfoMessage from "../../../components/infoMessage"

const updateCategorySchema = z.object({
  name: z.string({ required_error: "חובה להכניס שם קטגוריה" }).min(1, "חובה להכניס שם קטגוריה"),
  course: z.string({ required_error: "חובה לבחור קורס" }).min(1, "חובה לבחור קורס"),
})

const UpdateCategoryForm = () => {
  const { categoryId, courseId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const { data: category, isLoading, error } = useGetFullCategoryByIdQuery(categoryId)
  const { data: courses, isLoading: isLoadingCourses, error: coursesError } = useGetAllCoursesQuery()
  const [updateCategory] = useUpdateCategoryMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: { name: "", course: "" },
  })

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        course: category.course?._id || "",
      })
    }
  }, [category, reset])

  if (isLoading || isLoadingCourses) return <LoadingSpinner/>
  if (error || coursesError) return <ErrorMessage message={error?.data?.message || "משהו השתבש!!"}/>
  if (!category) return <InfoMessage message="לא נמצאה קטגוריה"/>

  const onSubmit = async (data) => {
    try {
      await updateCategory({ id: categoryId, ...data }).unwrap()

      toast.success(`הקטגוריה "${data.name}" עודכנה בהצלחה! `, {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate(location.state?.from || `/user/admin/data/courses/${courseId}`)
      })

    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "העדכון נכשל", {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  return (
   <Box className="p-6 max-w-3xl mx-auto relative bg-[rgba(255,265,25,0.2)] dark:!bg-[rgba(250,250,250,0)] max-md:p-3">
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <BackButton navigation={location.state?.from || `/user/admin/data/courses/${courseId}`} />

        <div className="mt-8">
          <SectionTitle text={`Update category: ${category.name}`} />
        </div>

        <FormInput
          label="Category Name"
          type="text"
          register={register("name")}
          error={errors.name?.message}
          placeholder="הכנס שם קטגוריה..."
          htmlFor="name"
        />

        <FormSelect
          label="Course"
          id="course"
          register={register("course")}
          error={errors.course?.message}
          options={[
            { value: "", label: "-- בחר קורס --" },
            ...(courses || []).map((course) => ({
              value: course._id,
              label: course.name,
            })),
          ]}
        />

        <DashedBox className="flex-col items-start mt-4">
          <p className="!text-[rgba(229,145,42,0.9)] font-semibold mb-2 text-lg">
            Challenge:
          </p>
          {category.challenge ? (
            <CustomLink
              to={`/user/admin/data/courses/${category.course._id}/category/${category._id}/challenge/${category.challenge._id}/update`}
              state={{ from: location.pathname }}
              className="block text-left py-2 px-3 border border-gray-300 rounded-lg bg-white hover:bg-[rgba(229,145,42,0.1)] hover:border-[rgba(229,145,42,0.6)] transition-colors duration-200 truncate"
            >
              Challenge
            </CustomLink>
          ) : (
            <p className="text-gray-500">No challenge linked</p>
          )}
        </DashedBox>

        <DashedBox className="flex-col items-start mt-4">
          <p className="!text-[rgba(229,145,42,0.9)] font-semibold mb-2 text-lg">
            Words:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
            {(category.words || []).length > 0 ? (
              category.words.map((word) => (
                <CustomLink
                  key={word._id}
                  to={`/user/admin/data/courses/${category.course._id}/category/${category._id}/words/${word._id}/update`}
                  state={{ from: location.pathname }}
                  className="block text-left py-2 px-3 border border-gray-300 rounded-lg bg-white hover:bg-[rgba(229,145,42,0.1)] hover:border-[rgba(229,145,42,0.6)] transition-colors duration-200 truncate"
                >
                  {word.word}
                </CustomLink>
              ))
            ) : (
              <p className="text-gray-500">No words in this category</p>
            )}
          </div>
        </DashedBox>

        <SubmitButton text="Save" isLoading={isSubmitting} className="mt-6" />
      </FormContainer>
    </Box>
  )
}

export default UpdateCategoryForm
