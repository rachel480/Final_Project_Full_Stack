import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormInput from "../../../components/formInput";
import { useUpdateMyCategoryMutation } from "./myCategoryApi";
import { toast } from "react-toastify";
import UpdateFormWrapper from "../common/updateFormWrapper";

const updateCategorySchema = z.object({
  name: z.string({required_error:true}).nonempty("קטגוריה חייבת להכיל לפחות תו 1")
});

const UpdateCategoryForm = ({ setShowUpdateForm, category }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: { name: category?.name || "" }
  });

  const [updateMyCategory, { isLoading }] = useUpdateMyCategoryMutation();

  const onSubmit = async (data) => {
    try {
      const res = await updateMyCategory({ id: category._id, name: data.name }).unwrap();
      toast.success(res.message || "קטגוריה עודכנה בהצלחה", { autoClose: 3000, onClose: () => setShowUpdateForm(false) });
    } catch (err) {
      toast.error(err?.data?.message || "העדכון נכשל", { autoClose: 3000 });
    }
  };

  return (
    <UpdateFormWrapper
      title="Update Category"
      isLoading={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      setShowUpdateForm={setShowUpdateForm}
    >
      <FormInput
        label="Name"
        type="text"
        register={register("name")}
        error={errors.name?.message}
        placeholder="Enter category name..."
      />
    </UpdateFormWrapper>
  )
}

export default UpdateCategoryForm;