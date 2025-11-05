import NavigateButton from "../../../components/navigateButton"
import { useGetAllUsersQuery } from "../../user/userApi"
import UserCard from "./userCard"

const UserList = () => {

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
                <h2 style={{ margin: 0 }}>👥 Users</h2>
                <NavigateButton navigation={"add"} buttonText={"➕ Add User"} />
            </div>

            <div>
                {users.map((user) => (
                    <UserCard user={user}/>
                ))}
            </div>
        </div>
    )
}

export default UserList