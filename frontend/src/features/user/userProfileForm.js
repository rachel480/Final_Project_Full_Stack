import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetSingleUserQuery, useUpdateUserMutation } from "./userApi";
import EditableFormInput from "../../components/editableFormInput";
import { toast } from "react-toastify";
import FormContainer from "../../components/formContainer";
import SubmitButton from "../../components/submitButton";
import CustomLink from "../../components/customLink";
import FormTitle from "../../components/formTitle";
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import LoadingSpinner from "../../components/loadingSpinner"
import ErrorMessage from "../../components/errorMessage"
import InfoMessage from "../../components/infoMessage"

const userSchema = z.object({
    fullName: z.string({ required_error: "חובה להכניס שם מלא" }).min(1, "שם מלא חייב להכיל לפחות תו 1"),
    email: z.string({ required_error: "חובה להכניס אימייל" }).nonempty("חובה להכניס אימייל").email("אימייל לא חוקי"),
    phone: z.string().optional()
        .refine(val => !val || val.length >= 9, {
            message: "מספר טלפון חייב להכיל לפחות 9 תווים",
        }),
})

const UserProfileForm = () => {
    const userId = useSelector((state) => state.auth.user?.id)
    const { data: user, isLoading, error } = useGetSingleUserQuery(userId)
    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation()

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
    })

    useEffect(() => {
        if (user) {
            reset({
                fullName: user.fullName,
                email: user.email,
                phone: user.phone || "",
            })
        }
    }, [user, reset])

    if (isLoading) return <LoadingSpinner text="טוען פרטי משתמש"/>
    if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"}/>
    if (!user) return <InfoMessage message="לא נמצאה משתמש"/>

    const onSubmit = async (data) => {
        const hasChanges = Object.keys(data).some((key) => {
            const original = user[key] ?? ""
            return data[key] !== original
        })

        if (!hasChanges) {
            toast.info('לא בוצעו שינויים', { position: "top-right", autoClose: 2000 })
            return
        }

        const payload = { id: userId, ...data, phone: data.phone || "" }

        try {
            await updateUser(payload).unwrap()
            toast.success("פרופיל עודכן בהצלחה", { position: "top-right", autoClose: 3000 })
        } catch (err) {
            toast.error(err?.data?.message || "שגיאה בעדכון פרופיל!!", { position: "top-right", autoClose: 3000 })
        }
    }

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)}>

            <FormTitle text={`פרופיל משתמש`} />

            <p className="text-center text-gray-600">{user.userName} :שם משתמש</p>

            <EditableFormInput
                label="שם מלא"
                htmlFor="fullName"
                register={register("fullName")}
                error={errors.fullName?.message}
                placeholder={user.fullName}
            />

            <EditableFormInput
                label="אימייל"
                htmlFor="email"
                register={register("email")}
                error={errors.email?.message}
                placeholder={user.email}
            />

            <EditableFormInput
                label="טלפון (אופציונלי)"
                htmlFor="phone"
                register={register("phone")}
                error={errors.phone?.message}
                placeholder={user.phone || "הכנס מספר טלפון..."}
            />

            <SubmitButton text="שמירת שינויים" isLoading={loadingUpdate} />

            <p className="text-center text-gray-600 flex justify-center items-center gap-1">
                <Tooltip title="לחיצה כפולה על שדה מאפשרת לערוך את הערך שלו">
                    <InfoIcon fontSize="small" className="cursor-pointer text-gray-500" />
                </Tooltip>
                <span>לשנות את השדות</span>
            </p>

            <p className="mt-4 text-center text-sm">
                <CustomLink to="/user/reset-password">לאיפוס סיסמא</CustomLink>
            </p>

        </FormContainer>
    
    )
}

export default UserProfileForm