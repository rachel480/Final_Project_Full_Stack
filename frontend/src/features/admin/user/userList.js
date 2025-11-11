import { useGetAllUsersQuery } from "../../user/userApi"
import UserCard from "./userCard"
import { HiUserGroup } from "react-icons/hi"
import AddButton from "../../../components/addButton" 
import { useNavigate } from "react-router-dom"

const UserList = () => {
  const navigate = useNavigate()
  const { data: users, isLoading, error } = useGetAllUsersQuery()

  if (isLoading) return <p>Loading users...</p>
  if (error) return <p>{error?.data?.message || "Something went wrong"}</p>
  if (!users?.length) return <p>No users found</p>

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <h2 className="flex items-center gap-2 text-[rgba(229,145,42,0.9)] font-bold text-2xl">
          <HiUserGroup className="text-[rgba(229,145,42,0.9)] text-3xl" />
          משתמשים
        </h2>

        <AddButton text="הוסף משתמש חדש" onClick={() => navigate("add")} />
      </div>

      <div>
        {users.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  )
}

export default UserList