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
import CardContainer from "../../../components/cardContainer";
import DashedBox from "../../../components/dashedBox";
import TagLabel from "../../../components/tagLable";
import CardRow from "../../../components/cardRow";

const SingleCourseCard = () => {
  const { courseId } = useParams()
  const { data: course, isLoading, error } = useGetFullCourseByIdQuery(courseId)
  const navigate = useNavigate()
  const location = useLocation()

  const [deleteCategory] = useDeleteCategoryMutation()
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleDeleteCategory = async () => {
    if (!selectedCategory) return
    setShowConfirm(false)

    try {
      await deleteCategory({ id: selectedCategory._id }).unwrap()
      toast.success(`Category "${selectedCategory.name}" was deleted successfully ✅`, {
        position: "top-right",
        autoClose: 3000,
      })
    } catch (err) {
      const errorMsg = err?.data?.message || "Failed to delete category ❌"
      toast.error(errorMsg, { position: "top-right", autoClose: 4000 })
    } finally {
      setSelectedCategory(null);
    }
  }

  if (isLoading) return <p>Loading course...</p>
  if (error) return <p>{error?.data?.message || "Something went wrong"}</p>

  return (
    <CardContainer>

      <BackButton navigation="/user/admin/data/courses" />
      <SectionTitle text={course.name} Icon={MenuBookIcon} />

      <div className="mt-4 space-y-2">
        <p><strong className="!text-[rgba(229,145,42,0.9)]">Level:</strong> {course.level}</p>
        <p><strong className="!text-[rgba(229,145,42,0.9)]">Status:</strong> {course.status}</p>
      </div>

      <DashedBox>
        <p className="!text-[rgba(229,145,42,0.9)] text-lg">Categories:</p>
        <AddButton text="הוסף קטגוריה חדשה" onClick={() => navigate("category/add")} />
      </DashedBox>

      {course.categories.map((category) => (
        <CardRow key={category._id}>
          <TagLabel text={category.name} />

          <div className="flex gap-2">
            <ShowDetailsButton onClick={() => navigate(`category/${category._id}`)} />
            <DeleteButton onClick={() => { setSelectedCategory(category); setShowConfirm(true); }} />
            <UpdateButton onClick={() => navigate(`category/${category._id}/update`, { state: { from: location.pathname } })} />
          </div>

        </CardRow>
      ))}

      {showConfirm && selectedCategory && (
        <ConfirmDeleteModal
          itemName={selectedCategory.name}
          handleDelete={handleDeleteCategory}
          setShowConfirm={setShowConfirm}
        />
      )}

    </CardContainer>
  )
}

export default SingleCourseCard