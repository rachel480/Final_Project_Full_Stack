import { useEffect } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  useGetFullCategoryByIdQuery,
  useUpdateCategoryMutation,
} from "../../category/categoryApi";
import { useGetAllCoursesQuery } from "../../course/courseApi";
import FormContainer from "../../../components/formContainer";
import SectionTitle from "../../../components/sectionTitle";
import FormInput from "../../../components/formInput";
import SubmitButton from "../../../components/submitButton";
import BackButton from "../../../components/backButton";
import CustomLink from "../../../components/customLink";
import DashedBox from "../../../components/dashedBox";

const updateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  course: z.string().min(1, "Course is required"),
});

const UpdateCategoryForm = () => {
  const { categoryId, courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: category, isLoading, error } = useGetFullCategoryByIdQuery(categoryId);
  const { data: courses } = useGetAllCoursesQuery();
  const [updateCategory] = useUpdateCategoryMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: { name: "", course: "" },
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        course: category.course?._id || "",
      });
    }
  }, [category, reset]);

  if (isLoading) return <p className="text-gray-500 text-center mt-8">Loading category...</p>;
  if (error) return <p className="text-red-500 text-center mt-8">{error?.data?.message || "Something went wrong"}</p>;
  if (!category) return <p className="text-gray-500 text-center mt-8">No category found</p>;

  const onSubmit = async (data) => {
    try {
      await updateCategory({ id: categoryId, ...data }).unwrap();
      toast.success(`Category "${data.name}" updated successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate(location.state?.from || `/user/admin/data/courses/${courseId}`);
      }, 3000);
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Update failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
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
        placeholder="Enter category name..."
        htmlFor="name"
      />

      {/* Course select stays as is */}
      <div className="flex flex-col gap-1 mt-4">
        <label htmlFor="course" className="font-semibold">
          Course
        </label>
        <select
          id="course"
          {...register("course")}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">-- Select Course --</option>
          {(courses || []).map((course) => (
            <option key={course._id} value={course._id}>
              {course.name}
            </option>
          ))}
        </select>
        {errors.course && <p className="text-red-500">{errors.course.message}</p>}
      </div>

      {/* Challenge */}
      <DashedBox className="flex-col items-start mt-4">
        <p className="!text-[rgba(229,145,42,0.9)] font-semibold mb-2 text-lg">Challenge:</p>
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

      {/* Words list */}
      <DashedBox className="flex-col items-start mt-4">
        <p className="!text-[rgba(229,145,42,0.9)] font-semibold mb-2 text-lg">Words:</p>
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
  );
};

export default UpdateCategoryForm