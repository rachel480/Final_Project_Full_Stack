import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterMutation, useLazyCheckUserNameUniquenessQuery } from './authApi'
import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import FormInput from '../../components/formInput'

const validPassword = (password) => {
  let capitalLetter = false
  let smallLetter = false
  let special = false

  for (let i = 0; i < password.length; i++) {
    if (password[i] >= 'A' && password[i] <= 'Z') capitalLetter = true
    if (password[i] >= 'a' && password[i] <= 'z') smallLetter = true
    if ("!@#$%^&*(),.?:{}|<>".includes(password[i])) special = true
  }

  return capitalLetter && smallLetter && special
}

const registerSchema = z.object({
  userName: z.string({ required_error: "user name is required" }).min(4, "user name must contain at least 4 characters"),
  password: z.string().min(8, "password must contain at least 8 characters").refine(val => validPassword(val), { message: "password must include a capital,small and special character" }),
  confirmPassword: z.string({ required_error: "confirm password is required" }),
  fullName: z.string({ required_error: "full name is required" }).min(1, "full name must contain at least 1 character"),
  email: z.string({ required_error: "email is required" }).nonempty("email is required").email("email is not valid"),
  phone: z.string().min(9, "phone must contain at least 9 numbers")
}).refine((data) => data.password === data.confirmPassword, {
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

  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setErrorMsg('')
    try {
      const userNameRes = await checkUsername(data.userName).unwrap()
      if (userNameRes === true) {
        setError('userName', {
          type: 'manual',
          message: 'user name must be unique'
        })
        return
      }

      const res = await registerUser(data).unwrap()
      setMessage(res.message)
      setTimeout(() => { setMessage(''); navigate('/login') }, 2000)
    }
    catch (err) {
      setErrorMsg(err?.data?.message || "Something went wrong. Please try again!!")
    }
  }

  return (
    <div>
      <h1>הרשמה</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="user name"
        type="text"
        register={register("userName")}
        error={errors.userName?.message}
        placeholder={"enter user name..."}
        htmlFor='userName'
      />

      <FormInput
        label="full name"
        type="text"
        register={register("fullName")}
        error={errors.fullName?.message}
        placeholder={"enter full name..."}
        htmlFor='fullName'
      />

      <FormInput
        label="password"
        type="password"
        register={register("password")}
        error={errors.password?.message}
        placeholder={"enter password..."}
        htmlFor='password'
      />

      <FormInput
        label="confirm password"
        type="password"
        register={register("confirmPassword")}
        error={errors.confirmPassword?.message}
        placeholder={"enter confirm password..."}
        htmlFor='confirmPassword'
      />

      <FormInput
        label="email"
        type="email"
        register={register("email")}
        error={errors.email?.message}
        placeholder={"enter email adress..."}
        htmlFor='email'
      />

      <FormInput
        label="phone"
        type="text"
        register={register("phone")}
        error={errors.phone?.message}
        placeholder={"enter phone number..."}
        htmlFor='phone'
      />

      <button type="submit" disabled={isLoading}>
        {isLoading ? "signing up..." : "sign up"}
      </button>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {message && <p style={{ color: "rgb(64, 255, 102)" }}>{message}</p>}
    </form>
     <Link to="/login">התחברות</Link>
    </div>
  )
}

export default RegisterForm
