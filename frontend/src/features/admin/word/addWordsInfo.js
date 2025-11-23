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
import FileInput from "../../../components/fileInput";

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
        }))

        const addAnother = window.confirm("תרצה להוסיף מילה נוספת??")
        if (!addAnother)
          dispatch(goToStep(step + 1))
      }

      reader.readAsDataURL(file)
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
    img: z.any()
      .refine(
        (files) => files instanceof FileList && files.length > 0,
        "התמונה חובה"
      ),
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
    !showList ? (
      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
        className="max-md:px-3 max-md:py-2"
      >
        <FormTitle text="הוספת מילה" className="max-md:text-lg" />

        <FormInput
          label="מילה"
          type="text"
          register={register("word")}
          error={errors.word?.message}
          placeholder="הכנס מילה..."
          htmlFor="word"
          className="max-md:text-sm"
        />

        <FormInput
          label="תרגום"
          type="text"
          register={register("translation")}
          error={errors.translation?.message}
          placeholder="הכנס תרגום..."
          htmlFor="translation"
          className="max-md:text-sm"
        />

        <FileInput
          label="תמונה"
          register={register}
          name="img"
          error={errors.img?.message}
          className="max-md:text-sm max-md:mt-2"
        />

        <SubmitButton
          text="שמירה"
          isLoading={isSubmitting}
          className="mt-4 max-md:mt-3"
        />

        <Button
          variant="text"
          onClick={() => setShowList(true)}
          className="mt-4 !text-orange-500 !underline max-md:text-sm max-md:mt-3"
        >
          מילים שהוספתי
        </Button>
      </FormContainer>
    ) : (
      <Paper
        elevation={1}
        className="max-w-md w-full mx-auto p-6 flex flex-col gap-3 rounded-xl bg-white shadow-sm
                   max-md:p-4 max-md:gap-2"
      >
        <SectionTitle text='רשימת מילים' className="max-md:text-lg" />

        <Stack spacing={2} className="max-md:space-y-1">
          {wordData.map((word, idx) => (
            <Box
              key={idx}
              className="p-3 bg-gray-50 rounded-lg border border-gray-200
                         max-md:p-2"
            >
              <Typography variant="subtitle1" className="font-semibold text-gray-500 max-md:text-sm">
                word: {word.word}
              </Typography>
              <Typography variant="subtitle1" className="font-semibold text-gray-500 max-md:text-sm">
                category: {word.categoryName}
              </Typography>
            </Box>
          ))}
        </Stack>

        <Button
          variant="text"
          onClick={() => setShowList(false)}
          className="mt-4 !text-orange-500 !underline max-md:text-sm max-md:mt-3"
        >
          הוספת מילה
        </Button>
      </Paper>
    )
  )
}

export default AddWordsInfo