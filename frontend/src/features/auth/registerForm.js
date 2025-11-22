import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegisterMutation, useLazyCheckUserNameUniquenessQuery } from './authApi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormInput from '../../components/formInput'
import FormContainer from '../../components/formContainer'
import FormTitle from '../../components/formTitle'
import SubmitButton from '../../components/submitButton'
import CustomLink from '../../components/customLink'
import validPassword from './service/validPassword'
import PasswordInput from '../../components/passwordInput'

const registerSchema = z.object({
  userName: z.string({ required_error: "חובה להכניס שם משתמש" }).min(4, "שם משתמש חייב להכיל לפחות 4 תווים"),
  password: z.string({ required_error: "חובה להכניס סיסמא" }).min(8, "סיסמא חייבת להכיל לפחות 8 תווים").refine(val => validPassword(val), { message: "סיסמא חייבת להכיל אות  גדולה , קטנה ותו מיוחד" }),
  confirmPassword: z.string({ required_error: "חובה לאמת סיסמא" }),
  fullName: z.string({ required_error: "חובה להכניס שם מלא" }).min(1, "שם מלא חייב להכיל לפחות תו 1"),
  email: z.string({ required_error: "חובה להכניס אימייל" }).nonempty("חובה להכניס אימייל").email("אימייל לא חוקי"),
  phone: z.string().optional().refine(val => !val || val.length >= 9, { message: "טלפוו חייב להכיל לפחות 9 תוים" }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: "סיסמאת האימות אינה תואמת את הסיסמא"
})

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm({ resolver: zodResolver(registerSchema) })
  const [registerUser, { isLoading }] = useRegisterMutation()
  const [checkUsername] = useLazyCheckUserNameUniquenessQuery()
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    try {
      const userNameRes = await checkUsername(data.userName).unwrap()
      if (userNameRes === true) {
        setError('userName', { type: 'manual', message: 'user name must be unique' })
        return
      }

      const res = await registerUser(data).unwrap()
      toast.success(res.message || "נרשמת בהצלחה!", {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate('/login')
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

          <FormTitle text="הרשמה" />

          <FormInput
            label="שם משתמש"
            type="text"
            register={register("userName")}
            error={errors.userName?.message}
            placeholder="הכנס שם משתמש..."
            htmlFor="userName"
          />

          <FormInput
            label="שם מלא"
            type="text"
            register={register("fullName")}
            error={errors.fullName?.message}
            placeholder="הכנס שם מלא..."
            htmlFor="fullName"
          />

          
          <FormInput
            label="אימייל"
            type="email"
            register={register("email")}
            error={errors.email?.message}
            placeholder="הכנס אימייל..."
            htmlFor="email"
          />

          <FormInput
            label="טלפון (אופציונלי)"
            type="text"
            register={register("phone")}
            error={errors.phone?.message}
            placeholder="הכנס מספר טלפון..."
            htmlFor="phone"
          />

          <SubmitButton text="הרשמה" isLoading={isLoading} />

          <p className="mt-4 text-center text-sm">
            כבר יש לך חשבון?{' '}
            <CustomLink to='/login'>התחברות</CustomLink>
          </p>

        </FormContainer>
  )
}

export default RegisterForm