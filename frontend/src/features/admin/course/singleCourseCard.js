import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useGetFullCourseByIdQuery } from "../../course/courseApi";
import { useDeleteCategoryMutation } from "../../category/categoryApi";
import ConfirmDeleteModal from "../../../components/confirmDeleteModal";
import { toast } from "react-toastify";
import BackButton from "../../../components/backButton";
import SectionTitle from "../../../components/sectionTitle";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import UpdateButton from "../../../components/updateButton";
import DeleteButton from "../../../components/deleteButton";
import ShowDetailsButton from "../../../components/showDetailesButton";
import AddButton from "../../../components/addButton";

const SingleCourseCard = () => {
  const { courseId } = useParams();
  const { data: course, isLoading, error } = useGetFullCourseByIdQuery(courseId);
  const navigate = useNavigate();
  const location = useLocation();

  const [deleteCategory] = useDeleteCategoryMutation();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return;
    setShowConfirm(false);

    try {
      await deleteCategory({ id: selectedCategory._id }).unwrap();
      toast.success(`Category "${selectedCategory.name}" was deleted successfully ✅`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      const errorMsg = err?.data?.message || "Failed to delete category ❌";
      toast.error(errorMsg, { position: "top-right", autoClose: 4000 });
    } finally {
      setSelectedCategory(null);
    }
  };

  if (isLoading) return <p>Loading course...</p>;
  if (error) return <p>{error?.data?.message || "Something went wrong"}</p>;

  return (
    <div className="max-w-[650px] mx-auto mt-8 p-6 bg-white/90 rounded-lg shadow-md font-sans">
      <BackButton navigation="/user/admin/data/courses" />

      <SectionTitle text={course.name} Icon={MenuBookIcon} />

      <div className="mt-4 space-y-2">
        <p>
          <strong>Level:</strong> {course.level}
        </p>
        <p>
          <strong>Status:</strong> {course.status}
        </p>
      </div>

      <div className="mt-6">
        <strong>Categories:</strong>

        {/* Add Category */}
        <div className="flex justify-between items-center mt-2 p-3 mb-2 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          <AddButton text="הוסף קטגוריה חדשה" onClick={() => navigate("category/add")}/>
        </div>

        {/* Existing categories */}
        <div className="space-y-2">
          {course.categories.map((category) => (
            <div
              key={category._id}
              className="flex justify-between items-center p-3 border rounded-lg bg-gray-100"
            >
              <p className="bg-cyan-200 text-cyan-900 font-semibold px-4 py-2 rounded-lg">
                {category.name}
              </p>

              <div className="flex gap-2">
                <ShowDetailsButton onClick={() => navigate(`category/${category._id}`)} />
                <DeleteButton onClick={() => { setSelectedCategory(category); setShowConfirm(true); }} />
                <UpdateButton onClick={() => navigate(`category/${category._id}/update`, { state: { from: location.pathname } })} />
              </div>

            </div>
          ))}
        </div>
      </div>

      {showConfirm && selectedCategory && (
        <ConfirmDeleteModal
          itemName={selectedCategory.name}
          handleDelete={handleDeleteCategory}
          setShowConfirm={setShowConfirm}
        />
      )}
    </div>
  );
};

export default SingleCourseCard;