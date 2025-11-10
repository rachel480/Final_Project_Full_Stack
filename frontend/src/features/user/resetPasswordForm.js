import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePasswordMutation } from "./userApi";
import { toast } from "react-toastify";
import EditableFormInput from "../../components/editableFormInput";
import NavigateButton from "../../components/navigateButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const validPassword = (password) => {
  let capitalLetter = false;
  let smallLetter = false;
  let special = false;

  for (let i = 0; i < password.length; i++) {
    if (password[i] >= 'A' && password[i] <= 'Z') capitalLetter = true;
    if (password[i] >= 'a' && password[i] <= 'z') smallLetter = true;
    if ("!@#$%^&*(),.?:{}|<>".includes(password[i])) special = true;
  }

  return capitalLetter && smallLetter && special;
}

const passwordSchema = z.object({
  oldPassword: z.string({ required_error: "Old password is required" }).min(8, "Password must contain at least 8 characters"),
  newPassword: z.string({ required_error: "New password is required" }).min(8, "Password must contain at least 8 characters")
    .refine(val => validPassword(val), { message: "Password must include a capital, small, and special character" }),
  confirmPassword: z.string({ required_error: "Confirm password is required" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Confirm password doesn't match password",
  path: ["confirmPassword"],
});

const ResetPasswordForm = () => {
  const userId = useSelector((state) => state.auth.user?.id);
  const [updatePassword] = useUpdatePasswordMutation();

  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data) => {
    try {
      await updatePassword({ id: userId, oldPassword: data.oldPassword, newPassword: data.newPassword }).unwrap();

      toast.success("Password was updated successfully", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/user/profile");
      }, 3000);

    } catch (err) {
      toast.error(err?.data?.message || "Error updating password", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
      }}
    >
      <NavigateButton buttonText={'🔙'} navigation={'/user/profile'} />

      <h2 style={{ textAlign: "center" }}>Reset Password</h2>

      <EditableFormInput
        label="Current Password"
        htmlFor="oldPassword"
        type="password"
        register={register("oldPassword")}
        error={errors.oldPassword?.message}
      />
      <EditableFormInput
        label="New Password"
        htmlFor="newPassword"
        type="password"
        register={register("newPassword")}
        error={errors.newPassword?.message}
      />
      <EditableFormInput
        label="Confirm New Password"
        htmlFor="confirmPassword"
        type="password"
        register={register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />

      <button
        type="submit"
        style={{
          marginTop: "16px",
          backgroundColor: "#1976d2",
          color: "#fff",
          border: "none",
          padding: "8px 12px",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Save New Password
      </button>
    </form>
  );
};

export default ResetPasswordForm