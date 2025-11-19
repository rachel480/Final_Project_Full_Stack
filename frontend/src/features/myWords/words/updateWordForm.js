import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../../../components/formInput";
import WordFormSelectCategory from "./wordFormSelectCategory";
import { useUpdateMyWordMutation } from "./myWordApi";
import { toast } from "react-toastify";
import UpdateFormWrapper from "../common/updateFormWrapper";

const updateMyWordSchema = z.object({
  word: z.object({
    word: z.string({required_error:"חובה להכניס מילה"}).nonempty("חובה להכניס מילה"),
    translation: z.string({required_error:"חובה להכניס תרגום"}).nonempty("חובה להכניס תרגום"),
    categoryName: z.string({required_error:"חובה לבחור שם קטגוריה"}).nonempty("חובה לבחור שם קטגוריה"),
  }),
  rateing: z.number().min(0).max(5)
})

const UpdateWordForm = ({ setShowUpdateForm, myWord }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(updateMyWordSchema),
    defaultValues: {
      word: {
        word: myWord?.word?.word || "",
        translation: myWord?.word?.translation || "",
        categoryName: myWord?.word?.categoryName || ""
      },
      rateing: myWord?.rateing || 0
    }
  });

  const [updateMyWord, { isLoading }] = useUpdateMyWordMutation();

  const onSubmit = async (data) => {
    try {
      const res = await updateMyWord({ ...data, id: myWord._id }).unwrap();
      toast.success(res.message || "המילה עודכנה בהצלחה!!", { autoClose: 3000, onClose: () => setShowUpdateForm(false) });
    } catch (err) {
      toast.error(err?.data?.message || "העדכון נכשל", { autoClose: 3000 });
    }
  };

  return (
    <UpdateFormWrapper
      title="Update Word"
      isLoading={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      setShowUpdateForm={setShowUpdateForm}
    >
      <FormInput
        label="Word"
        type="text"
        register={register("word.word")}
        error={errors.word?.word?.message}
        placeholder="Enter word..."
      />
      <FormInput
        label="Translation"
        type="text"
        register={register("word.translation")}
        error={errors.word?.translation?.message}
        placeholder="Enter translation..."
      />
      <WordFormSelectCategory
        label="Category"
        registerProps={register("word.categoryName")}
        error={errors.word?.categoryName?.message}
        placeholder="Choose category name..."
      />
      <FormInput
        label="Rating"
        type="number"
        register={register("rateing", { valueAsNumber: true })}
        error={errors.rateing?.message}
        placeholder="0-5"
      />
    </UpdateFormWrapper>
  )
}

export default UpdateWordForm