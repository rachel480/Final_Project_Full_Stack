import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useGetWordByIdQuery, useUpdateWordMutation } from "../../word/wordApi";
import { useGetAllCategoriesQuery } from "../../category/categoryApi";
import FormContainer from "../../../components/formContainer";
import SectionTitle from "../../../components/sectionTitle";
import FormInput from "../../../components/formInput";
import FormSelect from "../../../components/formSelect";
import SubmitButton from "../../../components/submitButton";
import BackButton from "../../../components/backButton";
import { Box, Button } from "@mui/material";
import LoadingSpinner from "../../../components/loadingSpinner"
import ErrorMessage from "../../../components/errorMessage"
import InfoMessage from "../../../components/infoMessage"

const updateWordSchema = z.object({
  word: z.string({ required_error: "חובה להכניס מילה" }).min(1, "חובה להכניס מילה"),
  translation: z.string({ required_error: "חובה להכניס תרגום"}).min(1, "חובה להכניס תרגום"),
  categoryName: z.string({required_error:"חובה לבחור שם קטגוריה"}).min(1, "חובה לבחור קטגוריה"),
  img: z
      .any()
      .refine(
        (files) => files instanceof FileList && files.length > 0,
        "התמונה חובה"
      )
})

const UpdateWordForm = () => {
  const { wordId, categoryId, courseId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  const { data: word, isLoading, error } = useGetWordByIdQuery(wordId)
  const { data: categories } = useGetAllCategoriesQuery()
  const [updateWord] = useUpdateWordMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(updateWordSchema),
    defaultValues: { word: "", translation: "", categoryName: "" },
  })

  const [existingImageSrc, setExistingImageSrc] = useState(null) 
  const [newImageFile, setNewImageFile] = useState(null) 
  const [previewSrc, setPreviewSrc] = useState(null) 
  const [showFileInput, setShowFileInput] = useState(false)
  const fileInputRef = useRef(null)

useEffect(() => {
  if (!word) return;

  reset({
    word: word.word,
    translation: word.translation,
    categoryName: word.categoryName,
  });

  if (word.img?.data && word.img?.contentType) {
    const src = `data:image/${word.img.contentType};base64,${word.img.data}`;
    setExistingImageSrc(src);
    setPreviewSrc(src);
  } else {
    setExistingImageSrc(null);
    setPreviewSrc(null);
  }
}, [word, reset]);


  if (isLoading) return <LoadingSpinner text="טוען מילה"/>
  if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"}/>
  if (!word) return <InfoMessage message="לא נמצאה מילה"/>

 
  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setNewImageFile(file)
     
      const reader = new FileReader()
      reader.onload = () => {
        setPreviewSrc(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      
      setNewImageFile(null)
      setPreviewSrc(existingImageSrc)
    }
  }

  const handleRemoveImage = () => {
    setNewImageFile(null)
    setPreviewSrc(null)
    setShowFileInput(true) 
  }

  if (isLoading) return <LoadingSpinner text="טוען מילה"/>
  if (error) return <ErrorMessage message={error?.data?.message || "משהו השתבש"}/>
  if (!word) return <InfoMessage message="לא נמצאה מילה"/>

  const onSubmit = async (data) => {
    try {
      
      const payload = {
        id: wordId,
        word: data.word,
        translation: data.translation,
        categoryName: data.categoryName,
        img: newImageFile || null
      }

      await updateWord(payload).unwrap()

      toast.success(`המילה עודכנה בהצלחה`, {
        position: "top-right",
        autoClose: 3000,
        onClose: () => navigate(location.state?.from || `/user/admin/data/courses/${courseId}/category/${categoryId}`)
      })

    } catch (err) {
      console.error(err)
      toast.error(err?.data?.message || "העדכון נכשל", {
        position: "top-right",
        autoClose: 3000,
      })
    }
  }

  return (
    <Box className="p-6 max-w-3xl mx-auto relative bg-[rgba(255,265,25,0.2)] max-md:p-3">
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        <BackButton
          navigation={
            location.state?.from ||
            `/user/admin/data/courses/${courseId}/category/${categoryId}`
          }
        />

        <div className="mt-8">
          <SectionTitle text={`Update word: ${word.word}`} />
        </div>

        <FormInput
          label="Word"
          type="text"
          register={register("word")}
          error={errors.word?.message}
          placeholder="הכנס מילה..."
          htmlFor="word"
        />

        <FormInput
          label="Translation"
          type="text"
          register={register("translation")}
          error={errors.translation?.message}
          placeholder="הכנס תרגום..."
          htmlFor="translation"
        />

        <FormSelect
          label="Category"
          id="categoryName"
          register={register("categoryName")}
          error={errors.categoryName?.message}
          options={(categories || []).map((category) => ({
            value: category.name,
            label: category.name,
          }))}
          defaultOption="-- בחר קטגוריה --"
        />

        {/* Image preview + Change button */}
        <div className="mt-4 flex items-start gap-4">
          <div>
            {previewSrc ? (
              <div className="flex flex-col items-center gap-2">
                <img src={previewSrc} alt="preview" style={{ width: 140, height: 140, objectFit: "cover", borderRadius: 8, border: "1px solid #ddd" }} />
                <div className="text-sm text-gray-600">תצוגת תמונה</div>
              </div>
            ) : (
              <div style={{ width: 140, height: 140, display: "flex", alignItems: "center", justifyContent: "center", background: "#f4f4f4", borderRadius: 8, border: "1px dashed #ddd" }}>
                <span className="text-sm text-gray-500">אין תמונה</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Button variant="contained" onClick={() => { setShowFileInput(!showFileInput); if (fileInputRef.current) fileInputRef.current.value = null; setNewImageFile(null); setPreviewSrc(existingImageSrc); }}>
              {showFileInput ? "בטל שינוי" : (previewSrc ? "שנה תמונה" : "העלה תמונה")}
            </Button>

            {previewSrc && (
              <Button variant="text" onClick={handleRemoveImage}>הסרת תצוגה</Button>
            )}

            {showFileInput && (
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="border p-2 rounded w-full"
              />
            )}

            <div className="text-xs text-gray-500 mt-2">ניתן לשנות את התמונה על ידי לחיצה על "שנה תמונה".</div>
          </div>
        </div>

        <SubmitButton text="Save" isLoading={isSubmitting} className="mt-6" />

      </FormContainer>
    </Box>
  )
}

export default UpdateWordForm
