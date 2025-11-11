import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useGetFullCourseByIdQuery, useUpdateCourseMutation } from "../../course/courseApi";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import FormContainer from "../../../components/formContainer";
import FormTitle from "../../../components/formTitle";
import FormInput from "../../../components/formInput";
import SubmitButton from "../../../components/submitButton";
import CustomLink from "../../../components/customLink";
import NavigateButton from "../../../components/navigateButton";
import BackButton from "../../../components/backButton";
import DashedBox from "../../../components/dashedBox";
import SectionTitle from "../../../components/sectionTitle";

const updateCourseSchema = z.object({
  name: z.string().min(1, "Course name is required"),
  level: z.enum(["Easy", "Medium", "Hard"], { required_error: "Level is required" }),
  status: z.enum(["draft", "published"], { required_error: "Status is required" }),
});

const UpdateCourseForm = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: course, isLoading, error } = useGetFullCourseByIdQuery(courseId);
  const [updateCourse] = useUpdateCourseMutation();

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
  });

  useEffect(() => {
    if (course) {
      reset({
        name: course.name,
        level: course.level,
        status: course.status,
      });
    }
  }, [course, reset]);

  if (isLoading) return <p className="text-gray-500 text-center mt-8">Loading course...</p>;
  if (error) return <p className="text-red-500 text-center mt-8">{error?.data?.message || "Something went wrong"}</p>;
  if (!course) return <p className="text-gray-500 text-center mt-8">No course found</p>;

  const onSubmit = async (data) => {
    try {
      await updateCourse({ id: courseId, ...data }).unwrap();
      toast.success(`Course "${data.name}" updated successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/user/admin/data/courses");
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
    <FormContainer onSubmit={handleSubmit(onSubmit)} >

      <BackButton navigation="/user/admin/data/courses" />

      <div className="mt-8">
        <SectionTitle text={`Update course: ${course.name}`} />
      </div>

      <FormInput
        label="Course Name"
        type="text"
        register={register("name")}
        error={errors.name?.message}
        placeholder="Enter course name..."
        htmlFor="name"
      />

      {/* Level */}
      <FormInput
        label="Level"
        type="select"
        register={register("level")}
        error={errors.level?.message}
        options={["Easy", "Medium", "Hard"]}
        htmlFor="level"
      />

      {/* Status */}
      <FormInput
        label="Status"
        type="select"
        register={register("status")}
        error={errors.status?.message}
        options={["draft", "published"]}
        htmlFor="status"
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
  );
};

export default UpdateCourseForm