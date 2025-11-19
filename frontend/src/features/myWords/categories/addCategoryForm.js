import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import FormInput from "../../../components/formInput";
import { useCreateMyCategoryMutation } from "./myCategoryApi";
import AddFormWrapper from "../common/addFormWrapper";

const addCategorySchema = z.object({
  name: z.string().nonempty("שם קטגוריה חייב להכיל לפחות תו 1")
});

const AddCategoryForm = ({ setShowAddForm }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(addCategorySchema)
  });
  const [createMyCategory, { isLoading }] = useCreateMyCategoryMutation();

  const onSubmit = async (data) => {
    try {
      const res = await createMyCategory(data).unwrap();
      toast.success(res.message || "קטגוריה נוספה בהצלחה", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => setShowAddForm(false)
      });
    } catch (err) {
      toast.error(err?.data?.message || "ההוספה נכשלה", { position: "top-right", autoClose: 3000 });
    }
  };

  return (
    <AddFormWrapper
      title="Add Category"
      onSubmit={handleSubmit(onSubmit)}
      onCancel={() => setShowAddForm(false)}
      isLoading={isLoading}
    >
      <FormInput
        label="Name"
        type="text"
        register={register("name")}
        error={errors.name?.message}
        placeholder="Enter category name..."
      />
      
    </AddFormWrapper>
  )
}

export default AddCategoryForm;
