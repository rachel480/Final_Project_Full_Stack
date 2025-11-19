import { useState } from "react";
import { toast } from "react-toastify";
import UpdateCategoryForm from "./updateCategoryForm";
import { useDeleteMyCategoryMutation } from "./myCategoryApi";
import UpdateButton from "../../../components/updateButton";
import DeleteButton from "../../../components/deleteButton";
import SingleCard from "../common/singleCard";

const CategoryCard = ({ category, setShowSingleCategory }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [deleteMyCategory] = useDeleteMyCategoryMutation();

  const handleDelete = async () => {
    try {
      const res = await deleteMyCategory({ id: category._id }).unwrap();
      toast.success(res?.message || "הקטגוריה נמחקה בהצלחה");
    } catch (err) {
      const msg = err?.data?.message || err?.error || "שגיאה לא ידועה";
      toast.error(msg);
    }
  };

  return (
    <>
      <SingleCard
        title={category.name}
        subtitle="לחץ כדי להציג מילים בקטגוריה"
        onClickTitle={() => setShowSingleCategory(category)}
        updateButton={<UpdateButton onClick={() => setShowUpdateForm(true)} />}
        deleteButton={<DeleteButton onClick={handleDelete} />}
      />
      {showUpdateForm && (
        <UpdateCategoryForm setShowUpdateForm={setShowUpdateForm} category={category} />
      )}
    </>
  )
}

export default CategoryCard