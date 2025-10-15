import { useNavigate } from "react-router-dom"

const UserCard = ({ user }) => {

  const navigate = useNavigate()

  return (
    <div
      style={{
        marginBottom: "15px",
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        backgroundColor: "#f9f9f9",
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
            //onClick={handleDelete}
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

    </div>
  )
}

export default UserCard