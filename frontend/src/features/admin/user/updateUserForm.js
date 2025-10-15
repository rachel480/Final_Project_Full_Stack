import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useGetSingleUserQuery, useUpdateUserByAdminMutation } from "../../user/userApi"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import NavigateButton from "../../../components/navigateButton"

const updateUserSchema = z.object({
    roles: z.enum(["User", "Admin"]),
    active: z.boolean()
})

const UpdateUserForm = () => {
    const { userId } = useParams()
    const { data: user, isLoading, error } = useGetSingleUserQuery(userId)
    const [updateUserByAdmin] = useUpdateUserByAdminMutation()
    const [message, setMessage] = useState(null)

    const { register, handleSubmit, reset } = useForm({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            roles: "User",
            active: true
        }
    })

    useEffect(() => {
        if (user) {
            reset({
                roles: user.roles.includes("Admin") ? "Admin" : "User",
                active: user.active
            })
        }
    }, [user, reset])

    if (isLoading) return <p>Loading user...</p>
    if (error) return <p>{error?.data?.message || "Something went wrong"}</p>
    if (!user) return <p>No user found</p>

    const onSubmit = async (data) => {
        try {
            await updateUserByAdmin({ id:userId, ...data }).unwrap()
            setMessage({ type: "success", text: "Updated successfully" })
        } catch (err) {
            console.error(err)
            setMessage({ type: "error", text: err?.data?.message || "Update failed" })
        }
    }

    return (
        <div style={{ maxWidth: 450, margin: "40px auto", padding: 20, border: "1px solid #ddd", borderRadius: 10, boxShadow: "0 3px 10px rgba(0,0,0,0.1)", backgroundColor: "#fff", fontFamily: "Arial, sans-serif" }}>

            <NavigateButton navigation={"/user/admin/users"} buttonText={"🔙"} />

            <h2><strong>update user:</strong>{user.userName}</h2>

            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 15 }}>
                <label style={{ fontWeight: "bold" }}>Roles</label>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            value="User"
                            {...register("roles")}
                            defaultChecked={user.roles.includes("User")}
                        /> User
                    </label>
                    <label style={{ marginLeft: 10 }}>
                        <input
                            type="checkbox"
                            value="Admin"
                            {...register("roles")}
                            defaultChecked={user.roles.includes("Admin")}
                        /> Admin
                    </label>
                </div>

                <label htmlFor="active" style={{ fontWeight: "bold" }}>Active</label>
                <select id="active" {...register("active")} style={{ padding: "6px 8px", borderRadius: 4, border: "1px solid #ccc" }}>
                    <option value={true}>true</option>
                    <option value={false}>false</option>
                </select>

                <button type="submit" style={{ marginTop: 10, backgroundColor: "#4caf50", color: "#fff", border: "none", padding: "8px 12px", borderRadius: 4, cursor: "pointer", fontWeight: "bold" }}>
                    Save
                </button>

                {message && <p style={{ color: message.type === "error" ? "red" : "green" }}>{message.text}</p>}
            </form>

        </div>
    )
}

export default UpdateUserForm
