import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterMutation,useLazyCheckUserNameUniquenessQuery } from './authApi'
import { useState } from 'react'

//function that checks if the password is correct
//(a correct password must contain a speciel letter a capital letter and a small)
const validPassword = (password) => {
    let capitalLetter = false
    let smallLetter = false
    let special = false

    for (let i = 0; i < password.length; i++) {
        if (password[i] > 'A' && password[i] < 'Z')
            capitalLetter = true
        if (password[i] > 'a' && password[i] < 'z')
            smallLetter = true
        if ("!@#$%^&*(),.?\:{}|<>".indexOf(password[i]) > -1)
            special = true
    }
    return capitalLetter && smallLetter && special
}

const registerSchema = z.object({
    //לבדוק ייחודיות של שם משתמש
    userName: z.string({ required_error: "user name is required" }).min(4, "user name must contain at least 4 characters"),
    password: z.string().min(8, "password must contain at least 8 characters").refine(val => validPassword(val), { message: "password must include a capital,small and special character" }),
    confirmPassword: z.string({ required_error: "confirm password is required" }),
    fullName: z.string({ required_error: "full name is required" }).min(1, "full name must contain at least 1 character"),
    email: z.string({ required_error: "email is required" }).email("email is not valid"),
    phone: z.string().min(9, "phone must contain at least 9 numbers")
})
    .refine((data) => data.password === data.confirmPassword, {
        path: ['confirmPassword'],
        message: "confirm password doesn't match password"
    })

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm({ resolver: zodResolver(registerSchema) })

    const [message, setMessage] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    const [registerUser, { isLoading }] = useRegisterMutation()
    const [checkUsername] = useLazyCheckUserNameUniquenessQuery()

    const onSubmit = async (data) => {
        setErrorMsg('')
        try {
            //check if userName is unique
            const userNameRes = await checkUsername(data.userName).unwrap()
            if (userNameRes === true) {
                setError('userName', {
                    type: 'manual',
                    message: 'username must be unique'
                })
                return
            }

            const res = await registerUser(data).unwrap()
            setMessage(res.message)
            setTimeout(() => setMessage(''), 5000)
            //navigate
        }
        catch (err) {
            setErrorMsg(err?.data?.message || "Something went wrong. Please try again!!")
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>user name</label>
                <input type='text' {...register("userName")} />
                {errors.userName && <p style={{ color: "red" }}>{errors.userName.message}</p>}
            </div>

            <div>
                <label>full name</label>
                <input type='text' {...register('fullName')} />
                {errors.fullName && <p style={{ color: "red" }}>{errors.fullName.message}</p>}
            </div>

            <div>
                <label>password</label>
                <input type='password' {...register('password')} />
                {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
            </div>

            <div>
                <label>confirm password</label>
                <input type='password' {...register('confirmPassword')} />
                {errors.confirmPassword && <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>}
            </div>

            <div>
                <label>email</label>
                <input type='email' {...register('email')} />
                {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
            </div>

            <div>
                <label>phone</label>
                <input type='text' {...register('phone')} />
                {errors.phone && <p style={{ color: "red" }}>{errors.phone.message}</p>}
            </div>

            <button type="submit" disabled={isLoading}>{isLoading ? "signing up..." : "sign up"}</button>
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
            {message && <p style={{ color: "rgb(64, 255, 102)" }}>{message}</p>}
        </form>)
}

export default RegisterForm