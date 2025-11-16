import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteCourseMutation } from "../../course/courseApi";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "../../../components/confirmDeleteModal";
import UpdateButton from "../../../components/updateButton";
import DeleteButton from "../../../components/deleteButton";
import ShowDetailsButton from "../../../components/showDetailesButton";
import TagLabel from "../../../components/tagLable";
import CardRow from "../../../components/cardRow";

const CourseCard = ({ course }) => {
  const navigate = useNavigate()
  const [deleteCourse] = useDeleteCourseMutation()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    setShowConfirm(false)
    try {
      await deleteCourse({ id: course._id }).unwrap();
      toast.success(`Course "${course.name}" was deleted successfully!`, {
        position: "top-right",
        autoClose: 3000,
      })
    } catch (err) {
      const errorMsg =
        err?.data?.message || "Server error occurred while deleting the course."
      toast.error(errorMsg, { position: "top-right", autoClose: 4000 })
    }
  }

  return (
    <CardRow>

      <TagLabel text={`${course.name}`} />

      <div className="flex gap-2">
        <ShowDetailsButton onClick={() => navigate(`${course._id}`)} />
        <DeleteButton onClick={() => setShowConfirm(true)} />
        <UpdateButton onClick={() => navigate(`${course._id}/update`)} />
      </div>

      {showConfirm && (
        <ConfirmDeleteModal
          itemName={course.name}
          handleDelete={handleDelete}
          setShowConfirm={setShowConfirm}
        />
      )}
      
    </CardRow>
  )
}

export default CourseCard