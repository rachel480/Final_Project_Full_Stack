import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from "react-redux"
import FormInput from "../../../components/formInput"
import { useState } from "react"
import FormContainer from "../../../components/formContainer"
import FormTitle from "../../../components/formTitle"
import SubmitButton from "../../../components/submitButton"
import WordCheckboxList from "./wordCheckboxList"
import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import SectionTitle from "../../../components/sectionTitle"

const AddCategoriesInfo = ({ setCategoryInfo, goToStep, selectWizardCategory, selectWizardData, selectWizardWords, selectWizardStep }) => {
  const dispatch = useDispatch()
  const categoryData = useSelector(selectWizardCategory) || []
  const step = useSelector(selectWizardStep)
  const wizardData = useSelector(selectWizardData)

  const wordData = useSelector(selectWizardWords) || []
  const notUsedWords = wordData.filter((word) => !word.categoryName)
  const [showList, setShowList] = useState(false)

  const lastCategory = categoryData.length > 0 ? categoryData[categoryData.length - 1]?.words.length < 10 ? categoryData[categoryData.length - 1] : null : null
  const [sumSelected, setSumSelected] = useState(lastCategory?.words?.length || 0)

  const categorySchema = z.object({
    name: z.string({ required_error: "חובה להכניס שם קטגוריה" })
      .nonempty("שם קטגוריה חייב להכיל לפחות תו 1")
      .refine(
        (val) => {
          if (val === lastCategory?.name)
            return true
          return !categoryData.some((cat) => cat.name === val)
        },
        { message: "כבר קיימת קטגוריה בשם זה" }
      ),
    words: z.array(z.string()).optional(),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: { words: lastCategory?.words || [], name: lastCategory?.name || "" }
  })

  const onSubmit = (data) => {
    dispatch(setCategoryInfo({ name: data.name, words: data.words }))
    if (data.words.length < 10) {
      const addWord = window.confirm("ניתן לעבור לשלב הבא אם יש לפחות 10 מילים בקטגוריה.\nהאם ברצונך לעבור להוספת המילים?")
      if (addWord)
        dispatch(goToStep(1))
      return
    }
    let addAnother = false
    if (Array.isArray(wizardData.categories)) {
      addAnother = window.confirm("תרצה להוסיף קטגוריה נוספת?");
    }
    reset({ words: [], name: "" })
    setSumSelected(0)
    if (!addAnother)
      dispatch(goToStep(step + 1))
  }

  return (
    !showList ?
      <FormContainer onSubmit={handleSubmit(onSubmit)}>

        <FormTitle text='הוספת קטגוריה' />

        <FormInput
          label="Category Name"
          type="text"
          register={register("name")}
          error={errors.name?.message}
          placeholder="הכנס שם קטגוריה..."
          htmlFor="category"
        />

        <label>
          <span>{sumSelected} selected Words</span>
        </label>

        <WordCheckboxList
          words={wordData}
          notUsedWords={notUsedWords}
          lastCategory={lastCategory}
          register={register}
          setSumSelected={setSumSelected}
        />

        <SubmitButton text={'Save'} />
        <Button variant="text" onClick={() => setShowList(true)} className="mt-4 !text-orange-500 !underline">קטגוריות שהוספתי</Button>

      </FormContainer>
      :
      <Paper elevation={1} className="max-w-md w-full mx-auto p-6 flex flex-col gap-3 rounded-xl bg-white shadow-sm">

        <SectionTitle text='רשימת קטגוריות' />

        <Stack spacing={2}>
          {categoryData.map((category, idx) => (
            <Box key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <Typography variant="subtitle1" className="font-semibold text-orange-500">
                {category.name}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                Words: {category.words.join(", ")}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Button variant="text" onClick={() => setShowList(false)} className="mt-4 !text-orange-500 !underline"> הוספת קטגוריה</Button>
      </Paper>
  )
}

export default AddCategoriesInfo