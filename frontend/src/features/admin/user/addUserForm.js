import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../components/formInput";
import FormSelect from "../../../components/formSelect";
import FormContainer from "../../../components/formContainer";
import FormTitle from "../../../components/formTitle";
import SubmitButton from "../../../components/submitButton";
import { setUserInfo } from "./userWizardSlice";
import { selectWizardData, selectWizardStep, goToStep } from "./userWizardSlice";

const userSchema = z.object({
  userName: z.string({ required_error: "חובה להכניס שם משתמש" }).nonempty("חובה להכניס שם משתמש"),
  password: z.string({ required_error: "חובה להכניס סיסמה" }).nonempty("חובה להכניס סיסמה"),
  fullName: z.string({ required_error: "חובה להכניס שם מלא" }).nonempty("חובה להכניס שם מלא"),
  email: z.string({ required_error: "חובה להכניס מייל" }).email("כתובת אימייל לא חוקית"),
  phone: z.string().optional(),
  roles: z.enum(["User", "Admin"]).default("User"),
  active: z.boolean().default(true),
})

const AddUserForm = () => {
  const dispatch = useDispatch()
  const wizardData = useSelector(selectWizardData)
  const step = useSelector(selectWizardStep)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: wizardData.userInfo,
  })

  const onSubmit = (data) => {
    dispatch(setUserInfo(data));
    dispatch(goToStep(step + 1));
  }

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <FormTitle text="פרטי משתמש" />

      <FormInput
        label="שם משתמש"
        type="text"
        register={register("userName")}
        error={errors.userName?.message}
        placeholder="הכנס שם משתמש..."
        htmlFor="userName"
      />

      <FormInput
        label="סיסמה"
        type="password"
        register={register("password")}
        error={errors.password?.message}
        placeholder="הכנס סיסמה..."
        htmlFor="password"
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
        label="טלפון"
        type="text"
        register={register("phone")}
        error={errors.phone?.message}
        placeholder="הכנס טלפון..."
        htmlFor="phone"
      />

      <FormSelect
        id="roles"
        label="roles"
        options={[
          { value: "", label: "-- בחר הרשאה --" },
          { value: "User", label: "User" },
          { value: "Admin", label: "Admin" },
        ]}
        register={register("roles")}
        error={errors.roles?.message}
      />

      <FormSelect
        id="active"
        label="active"
        options={[
          { value: "", label: "-- בחר פעיל/לא--" },
          { value: "true", label: "true" },
          { value: "false", label: "false" },
        ]}
        register={register("active", { setValueAs: (value) => value === "true" })}
        error={errors.active?.message}
      />

      <SubmitButton text="המשך" isLoading={isSubmitting} className="mt-4" />
    </FormContainer>
  )
}

export default AddUserForm
