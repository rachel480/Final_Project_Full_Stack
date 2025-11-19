import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import FormInput from "../../../components/formInput";
import WordFormSelectCategory from "./wordFormSelectCategory";
import { useCreateMyWordMutation } from "./myWordApi";
import AddFormWrapper from "../common/addFormWrapper";
import FileInput from "../../../components/fileInput";

const addMyWordSchema = z.object({
  word: z.object({
    word: z.string({required_error:"חובה להכניס מילה"}).nonempty("חובה להכניס מילה"),
    translation: z.string({required_error:"חובה להכניס תרגום"}).nonempty("חובה להכניס תרגום"),
    categoryName: z.string({required_error:"חובה לבחור שם קטגוריה"}).nonempty("חובה לבחור שם קטגוריה"),
  }),
  img: z.any().optional(),
  rateing: z.number().min(0).max(5).default(0)
})

const AddWordForm = ({ setShowAddForm, currentCategory }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(addMyWordSchema),
    defaultValues: { word: { word: "", translation: "", categoryName: currentCategory || "" }, rateing: 0, img: null }
  })
  const [createMyWord, { isLoading }] = useCreateMyWordMutation();

  const onSubmit = async (data) => {
    try {
      const file = data.img?.[0] || null
      const formData = new FormData()
      formData.append("word", JSON.stringify(data.word))
      if (file) formData.append("img", file)
      formData.append("rateing", data.rateing)

      const res = await createMyWord(formData).unwrap()
      toast.success(res.message || "מילה נוספה בהצלחה", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => setShowAddForm(false)
      })
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "ההוספה נכשלה!!", { position: "top-right", autoClose: 3000 });
    }
  }

  return (
    <AddFormWrapper
      title="Add Word"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => setShowAddForm(false)}
      isLoading={isLoading}
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

      <FormInput
        label="Rating"
        type="number"
        register={register("rateing", { valueAsNumber: true })}
        error={errors.rateing?.message}
        placeholder="0-5"
      />

      <WordFormSelectCategory
        currentCategory={currentCategory}
        label="Category"
        registerProps={register("word.categoryName")}
        error={errors.word?.categoryName?.message}
        placeholder="Choose category name..."
      />

      <FileInput label="Upload Image" register={register} name="img" />

    </AddFormWrapper>
  )
}

export default AddWordForm