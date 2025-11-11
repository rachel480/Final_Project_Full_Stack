import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteCourseMutation } from "../../course/courseApi";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "../../../components/confirmDeleteModal";
import UpdateButton from "../../../components/updateButton";
import DeleteButton from "../../../components/deleteButton";
import ShowDetailsButton from "../../../components/showDetailesButton";

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
    <div className="mb-4 p-4 rounded-lg shadow-md bg-[rgba(250,255,221,0.62)] border border-[rgba(229,145,42,0.62)]">
      <div className="flex justify-between items-center">

        <p className="bg-cyan-200 text-cyan-900 font-semibold px-4 py-2 rounded-lg bg-[rgba(32,255,87,0.62)]">
          {course.name}
        </p>

        <div className="flex gap-2">
          <ShowDetailsButton onClick={() => navigate(`${course._id}`)} />
          <DeleteButton onClick={() => setShowConfirm(true)} />
          <UpdateButton onClick={() => navigate(`${course._id}/update`)} />
        </div>
      </div>

      {showConfirm && (
        <ConfirmDeleteModal
          itemName={course.name}
          handleDelete={handleDelete}
          setShowConfirm={setShowConfirm}
        />
      )}
    </div>
  )
}

export default CourseCard