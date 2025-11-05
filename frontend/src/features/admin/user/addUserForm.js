import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import FormInput from "../../../components/formInput"
import NavigateButton from "../../../components/navigateButton"
import { useState } from "react"
import { useCreateNewUserMutation } from "../../user/userApi"
import { useNavigate } from "react-router-dom"

const createUserSchema = z.object({
    userName: z.string({ required_error: "Username is required" }).nonempty("UserName is required"),
    password: z.string({ required_error: "Password is required" }).nonempty("Password is required"),
    fullName: z.string({ required_error: "Full name is required" }).nonempty("Fullname is required"),
    email: z.string({ required_error: "Email is required" }).email("Invalid email address"),
    phone: z.string().optional(),
    roles: z.enum(["User", "Admin"]).default("User"),
    active: z.boolean().default(true),
})

const AddUserForm = () => {

    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState("")

    const [createNewUser] = useCreateNewUserMutation()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(createUserSchema),
        defaultValues: {
            roles: "User",
            active: true,
        }
    })

    const onSubmit = async (data) => {
        try {
            setErrorMsg(null)
            await createNewUser(data).unwrap()
            navigate("/user/admin/users")
        }
        catch (err) {
            console.error(err)
            setErrorMsg(err?.data?.message || err.message || "Error creating User")
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                width: "100%",
                maxWidth: 480,
                margin: "0 auto",
                padding: 14,
                border: "1px solid #eee",
                borderRadius: 8,
                background: "#fff",
                boxShadow: "0 1px 4px rgba(16,24,40,0.04)",
                fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
            }}
        >
            <NavigateButton navigation={"/user/admin/users"} buttonText={"🔙"} />

            <h1>Add User</h1>

            <FormInput
                label="UserName"
                type="text"
                register={register("userName")}
                error={errors.userName?.message}
                placeholder="Enter username..."
                htmlFor="userName"
            />

            <FormInput
                label="Password"
                type="password"
                register={register("password")}
                error={errors.password?.message}
                placeholder="Enter password..."
                htmlFor="password"
            />

            <FormInput
                label="Full Name"
                type="text"
                register={register("fullName")}
                error={errors.fullName?.message}
                placeholder="Enter full name..."
                htmlFor="fullName"
            />

            <FormInput
                label="Email"
                type="email"
                register={register("email")}
                error={errors.email?.message}
                placeholder="Enter email..."
                htmlFor="email"
            />

            <FormInput
                label="Phone"
                type="text"
                register={register("phone")}
                error={errors.phone?.message}
                placeholder="Enter phone number..."
                htmlFor="phone"
            />

            <label htmlFor="roles" style={{ fontWeight: "bold" }}>Role</label>
            <select
                id="roles"
                {...register("roles")}
                style={{
                    padding: "6px 8px",
                    borderRadius: 4,
                    border: "1px solid #ccc"
                }}
            >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
            </select>

            <label htmlFor="active" style={{ fontWeight: "bold" }}>Active</label>
            <select
                id="active"
                {...register("active")}
                style={{
                    padding: "6px 8px",
                    borderRadius: 4,
                    border: "1px solid #ccc"
                }}
            >
                <option value={true}>true</option>
                <option value={false}>false</option>
            </select>

            <button
                type="submit"
                style={{
                    marginTop: 10,
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: 4,
                    cursor: "pointer",
                    fontWeight: "bold"
                }}
            >
                Save
            </button>

            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

        </form>
    )
}

export default AddUserForm