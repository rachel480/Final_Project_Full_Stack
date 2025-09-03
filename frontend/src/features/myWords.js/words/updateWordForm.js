import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import FormInput from '../../../components/formInput'
import { useState } from 'react'
import { useUpdateMyWordMutation } from './myWordApi'
import WordFormSelectCategory from './wordFormSelectCategory'

const updateMyWordSchema = z.object({
  word: z.object({
    word: z.string({ required_error: 'Word is required' }).nonempty('Word cannot be empty'),
    translation: z.string({ required_error: 'Translation is required' }).nonempty('Translation cannot be empty'),
    categoryName: z.string({ required_error: 'Category is required' }).nonempty('Category cannot be empty'),
  }),
  rateing: z.number().min(0).max(5)
})

const UpdateWordForm = ({ setShowUpdateForm, myWord }) => {
  const [message, setMessage] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateMyWordSchema),
    defaultValues: {
      word: {
        word: myWord?.word?.word || "",
        translation: myWord?.word?.translation || "",
        categoryName: myWord?.word?.categoryName || ""
      },
      rateing: myWord?.rateing || 0
    }
  })

  const [updateMyWord, { isLoading }] = useUpdateMyWordMutation()

  const onSubmit = async (data) => {
    try {
      setErrorMsg('')
      const res = await updateMyWord({ ...data, id: myWord._id }).unwrap()
      setMessage(res.message || "Word updated successfully!")
      setTimeout(() => { setMessage(''); setShowUpdateForm(false) }, 2000)
    }
    catch (err) {
      setErrorMsg(err?.data?.message || "Something went wrong. Please try again!!")
    }
  }

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100%", height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.12)",
      display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <h1>Update My Word</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex", flexDirection: "column", gap: 12,
          width: "100%", maxWidth: 480, margin: "0 auto",
          padding: 14, border: "1px solid #eee", borderRadius: 8,
          background: "#fff", boxShadow: "0 1px 4px rgba(16,24,40,0.04)",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
        }}
      >
        <FormInput
          label="Word"
          type="text"
          register={register("word.word")}
          error={errors.word?.word?.message}
          placeholder="Enter word..."
          htmlFor="word"
        />

        <FormInput
          label="Translation"
          type="text"
          register={register("word.translation")}
          error={errors.word?.translation?.message}
          placeholder="Enter translation..."
          htmlFor="translation"
        />

        <WordFormSelectCategory
          label="Category Name"
          registerProps={register("word.categoryName")}
          error={errors.word?.categoryName?.message}
          placeholder="choose category name..."
        />

        <FormInput
          label="Rating"
          type="number"
          register={register("rateing", { valueAsNumber: true })}
          error={errors.rateing?.message}
          placeholder="Enter rating (0-5)..."
          htmlFor="rateing"
        />

        <button type={'submit'} disabled={isLoading}>Update</button>
        <button type={'button'} disabled={isLoading} onClick={() => setShowUpdateForm(false)}>Cancel</button>

        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        {message && <p style={{ color: "rgb(64, 255, 102)" }}>{message}</p>}
      </form>
    </div>
  )
}

export default UpdateWordForm