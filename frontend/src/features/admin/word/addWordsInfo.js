import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { Button } from "@mui/material"
import { Box, Typography, Paper, Stack } from "@mui/material";
import SectionTitle from "../../../components/sectionTitle";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import FormInput from "../../../components/formInput"
import FormContainer from "../../../components/formContainer"
import FormTitle from "../../../components/formTitle"
import SubmitButton from "../../../components/submitButton"

const AddWordsInfo = ({ selectWizardWords, setWordInfo, goToStep, selectWizardStep }) => {
  const dispatch = useDispatch()
  const step = useSelector(selectWizardStep)
  const wordData = useSelector(selectWizardWords) || []
  const [showList, setShowList] = useState(false)

  const handleData = (data) => {
    const file = data.img?.[0] || null

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        dispatch(setWordInfo({
          word: data.word,
          translation: data.translation,
          categoryName: "",
          imgData: reader.result,
          mimeType: file.type
        }));

        const addAnother = window.confirm("תרצה להוסיף מילה נוספת??")
        if (!addAnother)
          dispatch(goToStep(step + 1))
      };

      reader.readAsDataURL(file);
    } else {
      dispatch(setWordInfo({
        word: data.word,
        translation: data.translation,
        categoryName: "",
        imgData: null,
        mimeType: null
      }))
      const addAnother = window.confirm("תרצה להוסיף מילה נוספת??")
      if (!addAnother)
        dispatch(goToStep(step + 1))
    }
  }

  const wordSchema = z.object({
    word: z.string({ required_error: "חובה להכניס מילה" }).nonempty("חובה להכניס מילה")
      .refine((val) => !wordData?.some((w) => w.word === val), {
        message: "המילה כבר קיימת!",
      }),
    translation: z.string({ required_error: "חובה להכניס תרגום" }).nonempty("חובה להכניס תרגום"),
    img: z.any({required_error: "התמונה חובה"})
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(wordSchema),
  })

  const onSubmit = (data) => {
    handleData(data)
    reset()
  }

  return (
    !showList ?
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <FormTitle text="הוספת מילה" />

        <FormInput
          label="מילה"
          type="text"
          register={register("word")}
          error={errors.word?.message}
          placeholder="הכנס מילה..."
          htmlFor="word"
        />

        <FormInput
          label="תרגום"
          type="text"
          register={register("translation")}
          error={errors.translation?.message}
          placeholder="הכנס תרגום..."
          htmlFor="translation"
        />

        <div className="mt-4">
          <label className="block font-bold mb-1">תמונה</label>
          <input
            type="file"
            accept="image/*"
            {...register("img")}
            className="border p-2 rounded w-full"
          />
        </div>

        <SubmitButton text="שמירה" isLoading={isSubmitting} className="mt-4" />
        <Button variant="text" onClick={() => setShowList(true)} className="mt-4 !text-orange-500 !underline">מילים שהוספתי</Button>

      </FormContainer>

      :
      <Paper elevation={1} className="max-w-md w-full mx-auto p-6 flex flex-col gap-3 rounded-xl bg-white shadow-sm">

        <SectionTitle text='רשימת מילים' />

        <Stack spacing={2}>
          {wordData.map((word, idx) => (
            <Box key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <Typography variant="subtitle1" className="font-semibold text-gray-500">
                word:{word.word}
              </Typography>
              <Typography variant="subtitle1" className="font-semibold text-gray-500">
                category:{word.categoryName}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Button variant="text" onClick={() => setShowList(false)} className="mt-4 !text-orange-500 !underline"> הוספת מילה</Button>
      </Paper>
  )
}

export default AddWordsInfo