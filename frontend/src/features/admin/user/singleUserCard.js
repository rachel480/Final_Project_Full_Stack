import { useParams } from "react-router-dom"
import NavigateButton from "../../../components/navigateButton"
import { useGetSingleUserQuery } from "../../user/userApi"

const SingleUserCard = () => {
  const { userId } = useParams()
  const { data: user, isLoading, error } = useGetSingleUserQuery(userId)

  if (isLoading) return <p>Loading user...</p>
  if (error) return <p>{error?.data?.message || "Something went wrong"}</p>
  if (!user) return <p>No user found</p>

  const initial = user.userName?.charAt(0)?.toUpperCase() || "?"

  return (
    <div
      style={{
        maxWidth: "400px", 
        margin: "40px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div style={{ alignSelf: "flex-start", marginBottom: "10px" }}>
        <NavigateButton
          navigation={"/user/admin/users"}
          buttonText={"🔙"}
        />
      </div>

      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#4caf50",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        {initial}
      </div>

      <h2 style={{ marginBottom: "15px", fontSize: "20px" }}>{user.userName}</h2>

      <div style={{ textAlign: "left", width: "100%", maxWidth: "350px", fontSize: "14px" }}>
        <p><strong>ID:</strong> {user._id}</p>
        <p><strong>Full name:</strong> {user.fullName}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.roles}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Active?:</strong> {user.active ? "true" : "false"}</p>
        <p><strong>Created at:</strong> {user.createdAt}</p>
      </div>
    </div>
  )
}

export default SingleUserCard