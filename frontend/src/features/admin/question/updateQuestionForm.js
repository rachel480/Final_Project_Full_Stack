import { useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "react-toastify"
import { useGetFullQuestionByIdQuery, useUpdateQuestionMutation } from "../../question/questionApi"
import { useGetCategoryWordsQuery } from "../../category/categoryApi"
import NavigateButton from "../../../components/navigateButton"
import { shuffleArray } from "../challenge/services/challengeServices"

// סכמת ולידציה
const updateQuestionSchema = z
    .object({
        option1: z.string().min(1, "Option 1 is required"),
        option2: z.string().min(1, "Option 2 is required"),
        option3: z.string().min(1, "Option 3 is required"),
    })
    .superRefine((data, ctx) => {
        const { option1, option2, option3 } = data
        if (option1 === option2) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Option 1 and Option 2 must be different",
                path: ["option1"],
            })
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Option 1 and Option 2 must be different",
                path: ["option2"],
            })
        }
        if (option1 === option3) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Option 1 and Option 3 must be different",
                path: ["option1"],
            })
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Option 1 and Option 3 must be different",
                path: ["option3"],
            })
        }
        if (option2 === option3) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Option 2 and Option 3 must be different",
                path: ["option2"],
            })
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Option 2 and Option 3 must be different",
                path: ["option3"],
            })
        }
    })

const UpdateQuestionForm = () => {
    const { questionId, courseId, categoryId, challengeId } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    const { data: question, isLoading, error } = useGetFullQuestionByIdQuery(questionId)
    const { data: words, isLoading: loadingWords } = useGetCategoryWordsQuery(categoryId)
    const [updateQuestion] = useUpdateQuestionMutation()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(updateQuestionSchema),
        defaultValues: { option1: "", option2: "", option3: "" },
    })

    useEffect(() => {
        if (question && words) {
            console.log(question)
            const filteredOptions = question.options?.filter(opt => opt._id !== question.correctAnswer._id)
            reset({
                option1: filteredOptions[0]._id || "",
                option2: filteredOptions[1]?._id || "",
                option3: filteredOptions[2]?._id || "",
            })
        }
    }, [question,words, reset])

    if (isLoading || loadingWords) return <p>Loading question details...</p>
    if (error) return <p>{error?.data?.message || "Something went wrong"}</p>
    if (!question) return <p>No question found</p>

    const onSubmit = async (data) => {
        try {
            const options = [data.option1, data.option2, data.option3, question.correctAnswer._id]
            const shuffledOptions = shuffleArray(options)
            await updateQuestion({ id: questionId, options: shuffledOptions }).unwrap()

            toast.success("Question options updated successfully!", {
                position: "top-right",
                autoClose: 3000,
            })

            setTimeout(() => {
                const from =
                    location.state?.from ||
                    `/user/admin/data/courses/${courseId}/category/${categoryId}/challenge/${challengeId}`
                navigate(from)
            }, 3000)
        } catch (err) {
            console.error(err)
            toast.error(err?.data?.message || "Update failed", {
                position: "top-right",
                autoClose: 3000,
            })
        }
    }

    const validWords = (words || []).filter(
        (w) => w._id !== question.correctAnswer?._id
    )

    return (
        <div
            style={{
                maxWidth: 600,
                margin: "40px auto",
                padding: 20,
                border: "1px solid #ddd",
                borderRadius: 10,
                boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                backgroundColor: "#fff",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <NavigateButton
                buttonText="🔙"
                navigation={
                    location.state?.from ||
                    `/user/admin/data/courses/${courseId}/category/${categoryId}/challenge/${challengeId}`
                }
            />

            <h2>
                <strong>Update Question Options</strong>
            </h2>

            <p>
                <strong>Question word:</strong>{" "}
                {question.question?.word || "Unknown"}
            </p>
            <p>
                <strong>Correct answer:</strong>{" "}
                {question.correctAnswer?.word || "Unknown"}
            </p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    marginTop: 15,
                }}
            >
                {/* Option 1 */}
                <label style={{ fontWeight: "bold" }}>Option 1</label>
                <select
                    {...register("option1")}
                    style={{
                        padding: 6,
                        borderRadius: 4,
                        border: "1px solid #ccc",
                    }}
                >
                    <option value="">-- Select option 1 --</option>
                    {validWords.map((word) => (
                        <option key={word._id} value={word._id}>
                            {word.word}
                        </option>
                    ))}
                </select>
                {errors.option1 && <p style={{ color: "red" }}>{errors.option1.message}</p>}

                {/* Option 2 */}
                <label style={{ fontWeight: "bold" }}>Option 2</label>
                <select
                    {...register("option2")}
                    style={{
                        padding: 6,
                        borderRadius: 4,
                        border: "1px solid #ccc",
                    }}
                >
                    <option value="">-- Select option 2 --</option>
                    {validWords.map((word) => (
                        <option key={word._id} value={word._id}>
                            {word.word}
                        </option>
                    ))}
                </select>
                {errors.option2 && <p style={{ color: "red" }}>{errors.option2.message}</p>}

                {/* Option 3 */}
                <label style={{ fontWeight: "bold" }}>Option 3</label>
                <select
                    {...register("option3")}
                    style={{
                        padding: 6,
                        borderRadius: 4,
                        border: "1px solid #ccc",
                    }}
                >
                    <option value="">-- Select option 3 --</option>
                    {validWords.map((word) => (
                        <option key={word._id} value={word._id}>
                            {word.word}
                        </option>
                    ))}
                </select>
                {errors.option3 && <p style={{ color: "red" }}>{errors.option3.message}</p>}

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
                        fontWeight: "bold",
                    }}
                >
                    Save
                </button>
            </form>
        </div>
    )
}

export default UpdateQuestionForm