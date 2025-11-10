import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetSingleUserQuery, useUpdateUserMutation } from "./userApi";
import EditableFormInput from "../../components/editableFormInput";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const userSchema = z.object({
    fullName: z.string({ required_error: "full name is required" }).min(1, "full name must contain at least 1 character"),
      email: z.string({ required_error: "email is required" }).nonempty("email is required").email("email is not valid"),
    phone: z.string().optional()
    .refine(val => !val || val.length >= 9, {
      message: "phone must contain at least 9 numbers",
    }),
});

const UserProfileForm = () => {
    const userId = useSelector((state) => state.auth.user?.id);
    const { data: user, isLoading, error } = useGetSingleUserQuery(userId);
    const [updateUser] = useUpdateUserMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
        },
    });

    useEffect(() => {
        if (user) {
            reset({
                fullName: user.fullName,
                email: user.email,
                phone: user.phone || "",
            });
        }
    }, [user, reset]);

    if (isLoading) return <p>Loading user detailes ...</p>;

    if (error)
        return <p>{error?.data?.message || "something went wrong"}</p>

    if (!user) return <p>No user found</p>;

    const onSubmit = async (data) => {
        const hasChanges = Object.keys(data).some((key) => {
            const original = user[key] ?? "";
            return data[key] !== original;
        });

        if (!hasChanges) {
            toast.info('No changes were made', { position: "top-right", autoClose: 2000 });
            return;
        }

        const payload = {
            id: userId,
            ...data,
            phone: data.phone || "",
        };

        try {
            await updateUser(payload).unwrap();
            toast.success("Profile was updated successfully", { position: "top-right", autoClose: 3000 });
        } catch (err) {
            toast.error(err?.data?.message || "update failed", { position: "top-right", autoClose: 3000 });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                maxWidth: "600px",
                margin: "40px auto",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
                direction: "rtl",
            }}
        >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}><strong>{user.userName}-</strong> User profile</h2>

            <EditableFormInput
                label="full name"
                htmlFor="fullName"
                register={register("fullName")}
                error={errors.fullName?.message}
                placeholder={user.fullName}
            />

            <EditableFormInput
                label="email"
                htmlFor="email"
                register={register("email")}
                error={errors.email?.message}
                placeholder={user.email}
            />

            <EditableFormInput
                label="phone"
                htmlFor="phone"
                register={register("phone")}
                error={errors.phone?.message}
                placeholder={user.phone || "enter phone number"}
            />

            <button
                type="submit"
                style={{
                    marginTop: "20px",
                    backgroundColor: "#4caf50",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                }}
            >
                Save changes
            </button>

            <p style={{ textAlign: "center", marginTop: "10px", color: "#666" }}>
                (לחיצה כפולה על שדה מאפשרת עריכה)
            </p>

            <p style={{ textAlign: "center", marginTop: "10px" }}>
                <Link to="/user/reset-password" style={{ color: "#007bff", textDecoration: "none" }}>
                    to reset password
                </Link>
            </p>
        </form>
    );
};

export default UserProfileForm