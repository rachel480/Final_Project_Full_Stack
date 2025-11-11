import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useLoginMutation } from './authApi'
import { useDispatch } from 'react-redux'
import { setUser } from './authSlice'
import { useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify'
import FormInput from '../../components/formInput'
import FormContainer from '../../components/formContainer'
import FormTitle from '../../components/formTitle'
import SubmitButton from '../../components/submitButton'
import CustomLink from '../../components/customLink'

const loginSchema = z.object({
  userName: z.string({ required_error: "חובה להכניס שם משתמש" }).min(4, "שם משתמש חייב להכיל לפחות 4 תווים"),
  password: z.string({ required_error: "חובה להכניס סיסמא" }).min(8, "סיסמא חייבת להכיל לפחות 8 תווים"),
})

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) })

  const [loginUser, { isLoading }] = useLoginMutation()

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data).unwrap()

      localStorage.setItem('userAccessToken', res.accessToken)
      dispatch(setUser(res.user))

      toast.success(res.message || "נכנסת בהצלחה!", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate('/user')
      })

    } catch (err) {
      toast.error(err?.data?.message || "משהו השתבש...נסה שוב!!", {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>

      <FormTitle text={'כניסה'} />

      <FormInput
        label="שם משתמש"
        type="text"
        register={register("userName")}
        error={errors.userName?.message}
        placeholder="הכנס שם משתמש..."
        htmlFor="userName"
      />

      <FormInput
        label="סיסמא"
        type="password"
        register={register("password")}
        error={errors.password?.message}
        placeholder="הכנס סיסמא..."
        htmlFor="password"
      />

      <SubmitButton text="כניסה" isLoading={isLoading} />

      <p className="mt-4 text-center text-sm">
        עדיין אין לך חשבון?{' '}
        <CustomLink to="/register">הרשמה</CustomLink>
      </p>

    </FormContainer>
  )
}

export default LoginForm