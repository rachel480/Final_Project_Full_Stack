import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import FormInput from "../../../components/formInput"
import { useDispatch, useSelector } from "react-redux"
import { setCourseInfo, goToStep, selectWizardCourse } from "./courseWizardSlice"

const createCourseSchema = z.object({
    name: z.string({ required_error: "Course name is required" }).nonempty("Course name must contain at least 1 character"),
    level: z.enum(["Easy", "Medium", "Hard"]),
})

const AddCourseInfo = () => {

    const dispatch = useDispatch()
    const courseData = useSelector(selectWizardCourse)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(createCourseSchema),
        defaultValues: { level: courseData.level || "easy", name: courseData.name || "" },
    })

    const onSubmit = (data) => {
        dispatch(setCourseInfo(data))
        dispatch(goToStep(2))
    }

    return (
        <div >
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 480, margin: "0 auto", padding: 14, border: "1px solid #eee", borderRadius: 8, background: "#fff", boxShadow: "0 1px 4px rgba(16,24,40,0.04)", fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>
                <h1>Add Course</h1>

                <FormInput
                    label="Course Name"
                    type="text"
                    register={register("name")}
                    error={errors.name?.message}
                    placeholder="Enter course name..."
                    htmlFor="name"
                />

                <label htmlFor="level">Level</label>
                <select id="level" {...register("level")}>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>

                {errors.level && <p style={{ color: "red" }}>{errors.level.message}</p>}

                <button type="submit">save</button>

            </form>
        </div>
    )
}

export default AddCourseInfo