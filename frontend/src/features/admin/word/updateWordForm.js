import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {useGetWordByIdQuery,useUpdateWordMutation} from "../../word/wordApi";
import { useGetAllCategoriesQuery } from "../../category/categoryApi";
import FormContainer from "../../../components/formContainer";
import SectionTitle from "../../../components/sectionTitle";
import FormInput from "../../../components/formInput";
import SubmitButton from "../../../components/submitButton";
import BackButton from "../../../components/backButton";

const updateWordSchema = z.object({
  word: z.string().min(1, "Word is required"),
  translation: z.string().min(1, "Translation is required"),
  categoryName: z.string().min(1, "Category is required"),
});

const UpdateWordForm = () => {
  const { wordId, categoryId, courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: word, isLoading, error } = useGetWordByIdQuery(wordId);
  const { data: categories } = useGetAllCategoriesQuery();
  const [updateWord] = useUpdateWordMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateWordSchema),
    defaultValues: { word: "", translation: "", categoryName: "" },
  });

  useEffect(() => {
    if (word) {
      reset({
        word: word.word,
        translation: word.translation,
        categoryName: word.categoryName,
      });
    }
  }, [word, reset]);

  if (isLoading)
    return <p className="text-gray-500 text-center mt-8">Loading word...</p>;
  if (error)
    return (
      <p className="text-red-500 text-center mt-8">
        {error?.data?.message || "Something went wrong"}
      </p>
    );
  if (!word)
    return <p className="text-gray-500 text-center mt-8">No word found</p>;

  const onSubmit = async (data) => {
    try {
      await updateWord({ id: wordId, ...data }).unwrap();
      toast.success(`Word "${data.word}" updated successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate(
          location.state?.from ||
            `/user/admin/data/courses/${courseId}/category/${categoryId}`
        );
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
      <BackButton
        navigation={
          location.state?.from ||
          `/user/admin/data/courses/${courseId}/category/${categoryId}`
        }
      />

      <div className="mt-8">
        <SectionTitle text={`Update word: ${word.word}`} />
      </div>

      <FormInput
        label="Word"
        type="text"
        register={register("word")}
        error={errors.word?.message}
        placeholder="Enter word..."
        htmlFor="word"
      />

      <FormInput
        label="Translation"
        type="text"
        register={register("translation")}
        error={errors.translation?.message}
        placeholder="Enter translation..."
        htmlFor="translation"
      />

      {/* Category select stays as is */}
      <div className="flex flex-col gap-1 mt-4">
        <label htmlFor="categoryName" className="font-semibold">
          Category
        </label>
        <select
          id="categoryName"
          {...register("categoryName")}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">-- Select Category --</option>
          {(categories || []).map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryName && (
          <p className="text-red-500">{errors.categoryName.message}</p>
        )}
      </div>

      <SubmitButton text="Save" isLoading={isSubmitting} className="mt-6" />
    </FormContainer>
  );
};

export default UpdateWordForm