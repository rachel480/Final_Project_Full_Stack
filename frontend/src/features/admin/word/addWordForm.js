import FormInput from "../../../components/formInput"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const AddWordForm = ({ handleData,wordData }) => {

    const wordSchema = z.object({
        word: z.string({ required_error: "Word is required" })
            .nonempty("Word must contain at least 1 character")
            .refine((val) => !wordData?.some((w) => w.word === val), {
                message: "This word already exists!",
            }),
        translation: z.string({ required_error: "Translation is required" })
            .nonempty("Translation must contain at least 1 character"),
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(wordSchema),
    })

    const onSubmit=(data)=>{
        handleData(data)
        reset()
    }

    return <form
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
            fontFamily:
                "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
        }}
    >
        <h1>Add Word</h1>

        <FormInput
            label="Word"
            type="text"
            register={register("word")}
            error={errors.word?.message}
            placeholder="Enter word..."
            htmlFor="word"
        />

        <FormInput
            label="Translation"
            type="text"
            register={register("translation")}
            error={errors.translation?.message}
            placeholder="Enter translation..."
            htmlFor="translation"
        />

        <button type="submit" style={{ marginTop: 10 }}>
            save
        </button>

    </form>
}

export default AddWordForm