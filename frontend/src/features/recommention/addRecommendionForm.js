import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateRecommendionMutation } from "./recommendtionApi";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

const recommendionSchema = z.object({
    userName: z.string({ required_error: "חובה להכניס שם משתמש" }).nonempty("חובה להכניס שם משתמש"),
    recommendtion: z.string({ required_error: "חובה למלא תוכן התגובה" }).nonempty("חובה למלא תוכן התגובה"),
    rating: z.number({ required_error: "חובה לדרג" }).min(1).max(5)
})

const AddRecommendionForm = () => {
    const [createRecommendion] = useCreateRecommendionMutation();
    const [message, setMessage] = useState("")
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(recommendionSchema),
        defaultValues: { userName: "", recommendtion: "", rating:"" }
    })

    const onSubmit = async (data) => {
        setMessage("")
        try {
            await createRecommendion(data).unwrap()
            setMessage("התגובה נשלחה וממתינה לאישור מנהל ✔")
            setTimeout(()=>navigate('/user/home-page'),3000)
        } catch (err) {
            setMessage("אירעה שגיאה בשליחת התגובה ❌")
            setTimeout(()=>setMessage(""),3000)
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">

            <h1 className="text-3xl font-bold mb-5 text-purple-700">
                כתיבת תגובה
            </h1>

            {message && (
                <div className="p-3 mb-4 rounded bg-indigo-100 text-indigo-700 font-semibold">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

                <div>
                    <label className="block font-semibold mb-1">שם משתמש</label>
                    <input
                        type="text"
                        className="w-full border p-2 rounded"
                        {...register("userName")}
                        placeholder="הכנס שם..."
                    />
                    {errors.userName && (
                        <p className="text-red-600 text-sm mt-1">{errors.userName.message}</p>
                    )}
                </div>

                <div>
                    <label className="block font-semibold mb-1">תוכן התגובה</label>
                    <textarea
                        className="w-full border p-2 rounded resize-none h-28"
                        {...register("recommendtion")}
                        placeholder="הכנס תגובה..."
                    />
                    {errors.recommendtion && (
                        <p className="text-red-600 text-sm mt-1">{errors.recommendtion.message}</p>
                    )}
                </div>

                <div>
                    <label className="block font-semibold mb-1">דירוג</label>
                    <select
                        className="w-full border p-2 rounded"
                        {...register("rating", { valueAsNumber: true })}
                    >
                        <option value="" label="-- כמה אתה מרוצה מהאתר שלנו?? --"/>
                        <option value={5}>⭐ 5</option>
                        <option value={4}>⭐ 4</option>
                        <option value={3}>⭐ 3</option>
                        <option value={2}>⭐ 2</option>
                        <option value={1}>⭐ 1</option>
                    </select>
                    {errors.rating && (
                        <p className="text-red-600 text-sm mt-1">{errors.rating.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="p-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition"
                >
                    שלח תגובה
                </button>
            </form>

        </div>
    )
}

export default AddRecommendionForm