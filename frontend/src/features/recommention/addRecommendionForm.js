import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateRecommendionMutation } from "./recommendtionApi";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import FormTitle from "../../components/formTitle";
import FormContainer from "../../components/formContainer";
import SubmitButton from "../../components/submitButton";
import FormInput from "../../components/formInput";
import FormSelect from "../../components/formSelect";
import SideMenu from "../../components/sideMenu";

const recommendionSchema = z.object({
    userName: z.string({ required_error: "חובה להכניס שם משתמש" }).nonempty("חובה להכניס שם משתמש"),
    recommendtion: z.string({ required_error: "חובה למלא תוכן התגובה" }).nonempty("חובה למלא תוכן התגובה"),
    rating: z.number({ required_error: "חובה לדרג" }).min(1).max(5)
})

const AddRecommendionForm = () => {
    const [createRecommendion] = useCreateRecommendionMutation();
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(recommendionSchema),
        defaultValues: { userName: "", recommendtion: "", rating: "" }
    })

    const onSubmit = async (data) => {
        setMessage("")
        try {
            await createRecommendion(data).unwrap()
            setMessage("התגובה נשלחה וממתינה לאישור מנהל ✔")
            setTimeout(() => navigate('/user/home-page'), 3000)
        } catch (err) {
            setMessage("אירעה שגיאה בשליחת התגובה ❌")
            setTimeout(() => setMessage(""), 3000)
        }
    }

    return (
        <FormContainer onSubmit={handleSubmit(onSubmit)} className="max-md:px-4 max-md:py-4">
            
            <FormTitle text='הוספת המלצה' />
             <SideMenu/>
            {message && (
                <div className="p-3 mb-4 rounded bg-indigo-100 text-indigo-700 font-semibold text-center max-md:text-sm">
                    {message}
                </div>
            )}

            <FormInput
                label="שם משתמש"
                type="text"
                register={register("userName")}
                error={errors.userName?.message}
                placeholder="הכנס שם משתמש"
                htmlFor="userName"
            />

            <div className="flex flex-col mb-4 max-md:mb-3">
                <label htmlFor="recommendtion" className="text-gray-700 mb-1 max-md:text-sm">תוכן תגובה</label>
                <textarea
                    {...register("recommendtion")}
                    id="recommendtion"
                    placeholder="הכנס את התגובה שלך..."
                    className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 max-md:text-sm"
                    rows={5}
                />
                {errors.recommendtion && (
                    <span className="text-red-500 text-sm mt-1">
                        {errors.recommendtion.message}
                    </span>
                )}
            </div>

            <FormSelect
                label="דירוג"
                id="rating"
                register={register("rating", { valueAsNumber: true })}
                error={errors.rating?.message}
                options={[
                    { value: "", label: "-- כמה אתה מרוצה מהאתר שלנו?? --" },
                    { value: 5, label: "⭐ 5" },
                    { value: 4, label: "⭐ 4" },
                    { value: 3, label: "⭐ 3" },
                    { value: 2, label: "⭐ 2" },
                    { value: 1, label: "⭐ 1" },
                ]}
            />

            <SubmitButton text='שלח תגובה' disabled={isSubmitting} />

        </FormContainer>
    )
}

export default AddRecommendionForm