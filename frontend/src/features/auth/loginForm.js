import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useLoginMutation } from './authApi'
import { useState } from 'react'
import FormInput from '../../components/formInput'


const loginSchema = z.object({
    userName: z.string({ required_error: "user name is required" }).min(4, "user name must contain at least 4 characters"),
    password: z.string({ required_error: "password is required" }).min(8, "password must contain at least 8 characters")
})

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: zodResolver(loginSchema) })

    const [message, setMessage] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const [loginUser, { isLoading }] = useLoginMutation()

    const onSubmit = async (data) => {
        try {
            setErrorMsg('')
            const res = await loginUser(data).unwrap()
            localStorage.setItem('userAcssesToken',res.accessToken)
            setMessage(res.message)
            setTimeout(() => { setMessage('') }, 5000)
            //navigation
        }
        catch (err) {
            setErrorMsg(err?.data?.message || "Something went wrong. Please try again!!")
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                label="user name"
                type="text"
                register={register("userName")}
                error={errors.userName?.message}
                placeholder={"enter user name..."}
                htmlFor="userName"
            />

            <FormInput
                label="password"
                type="password"
                register={register("password")}
                error={errors.password?.message}
                placeholder={"enter password..."}
                htmlFor="password"
            />
            <button type="submit" disabled={isLoading}>
                {isLoading ? "logining..." : "log in"}
            </button>

            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
            {message && <p style={{ color: "rgb(64, 255, 102)" }}>{message}</p>}
        </form>
    )
}
export default LoginForm