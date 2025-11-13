import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteUserByAdminMutation } from "../../user/userApi";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "../../../components/confirmDeleteModal";
import ShowDetailsButton from "../../../components/showDetailesButton";
import DeleteButton from "../../../components/deleteButton";
import UpdateButton from "../../../components/updateButton";
import TagLabel from "../../../components/tagLable";
import CardRow from "../../../components/cardRow";

const UserCard = ({ user }) => {
  const navigate = useNavigate();
  const [deleteUserByAdmin] = useDeleteUserByAdminMutation();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setShowConfirm(false);
    try {
      await deleteUserByAdmin(user._id).unwrap();
      toast.success(`User "${user.userName}" was deleted successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      const errorMsg =
        err?.data?.message || "Server error occurred while deleting the user.";
      toast.error(errorMsg, { position: "top-right", autoClose: 4000 });
    }
  };

  return (
    <CardRow>

      <TagLabel text={user.userName} />

      <div className="flex gap-2">
        <ShowDetailsButton onClick={() => navigate(`${user._id}`)} />
        <DeleteButton onClick={() => setShowConfirm(true)} />
        <UpdateButton onClick={() => navigate(`${user._id}/update`)} />
      </div>

      {showConfirm && (
        <ConfirmDeleteModal
          itemName={user.userName}
          handleDelete={handleDelete}
          setShowConfirm={setShowConfirm}
        />
      )}

    </CardRow>
  );
};

export default UserCard;
