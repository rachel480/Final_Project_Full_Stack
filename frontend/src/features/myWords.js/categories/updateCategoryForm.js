import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import FormInput from '../../../components/formInput'
import { useState } from 'react'
import {  useUpdateMyCategoryMutation } from './myCategoryApi'

const updateCategorySchema = z.object({
    name: z.string({ required_error: 'category name is required' }).nonempty('category name must contain at least 1 charachter')
})
const UpdateCategoryForm = ({ setShowUpdateForm,category }) => {
    const [message, setMessage] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: zodResolver(updateCategorySchema),defaultValues: {
        name: category?.name || ""
    } })

    const [updateMyCategory,{isLoading}]=useUpdateMyCategoryMutation()

    const onSubmit = async (data) => {
        try {
            setErrorMsg('')
            const res = await updateMyCategory({name:data.name,id:category._id}).unwrap()
            setMessage(res.message)
            setTimeout(() => { setMessage(''); setShowUpdateForm(false) }, 2000)
        } catch (err) {
            setErrorMsg(err?.data?.message || "Something went wrong. Please try again!!")
        }
    }

    return (
        <div >
            <h1>Update category</h1>
            <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex",flexDirection: "column",gap: 12,width: "100%",maxWidth: 480,margin: "0 auto",padding: 14,border: "1px solid #eee",borderRadius: 8,background: "#fff",boxShadow: "0 1px 4px rgba(16,24,40,0.04)",fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial" }}>
                <FormInput
                    label="category name"
                    type="text"
                    register={register("name")}
                    error={errors.name?.message}
                    placeholder={'enter category name...'}
                    htmlFor="name"
                />

                <button type={'submit'} disabled={isLoading} >update</button>
                <button type={'button'} disabled={isLoading} onClick={() => setShowUpdateForm(false)}>cancle</button>

                {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
                {message && <p style={{ color: "rgb(64, 255, 102)" }}>{message}</p>}
            </form>
        </div>
    )
}
export default UpdateCategoryForm