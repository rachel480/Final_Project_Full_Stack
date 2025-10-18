
import { useNavigate } from "react-router-dom"
import { useDeleteUserByAdminMutation } from "../../user/userApi"
import { useState } from "react"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const UserCard = ({ user }) => {
  const navigate = useNavigate()
  const [deleteUserByAdmin] = useDeleteUserByAdminMutation()
  const [showConfirm, setShowConfirm] = useState(false)

  const handleDelete = async () => {
    setShowConfirm(false)
    try {
      await deleteUserByAdmin(user._id).unwrap()
      toast.success(`User "${user.userName}" was deleted successfully!`, {
        position: "top-right",
        autoClose: 3000,
      })
    } catch (err) {
      console.error("Delete error:", err)
      const errorMsg = err?.data?.message || "Server error occurred while deleting the user."
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 4000,
      })
    }
  }

  return (
    <div
      style={{
        marginBottom: "15px",
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          onClick={() => navigate(`${user._id}`)}
          style={{
            backgroundColor: "#4caf50",
            color: "#fff",
            border: "none",
            padding: "8px 14px",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {user.userName}
        </button>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setShowConfirm(true)}
            style={{
              backgroundColor: "#e53935",
              color: "#fff",
              border: "none",
              padding: "6px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            🗑️
          </button>

          <button
            onClick={() => navigate(`${user._id}/update`)}
            style={{
              backgroundColor: "#fbc02d",
              color: "#333",
              border: "none",
              padding: "6px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            ✏️
          </button>
        </div>
      </div>

      {/* ✅ Confirmation modal */}
      {showConfirm && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 10,
          }}
        >
          <p>
            Are you sure you want to delete user <strong>{user.userName}</strong>?
          </p>
          <div style={{ display: "flex", justifyContent: "space-around", marginTop: "15px" }}>
            <button
              onClick={handleDelete}
              style={{
                backgroundColor: "#e53935",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              style={{
                backgroundColor: "#9e9e9e",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserCard