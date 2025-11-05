import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDispatch, useSelector } from "react-redux"
import FormInput from "../../../components/formInput"
import { useState } from "react"

const AddCategoriesInfo = ({setCategoryInfo, goToStep, selectWizardCategory,selectWizardData, selectWizardWords,selectWizardStep}) => {
  const dispatch = useDispatch()
  const categoryData = useSelector(selectWizardCategory) || []
  const step = useSelector(selectWizardStep)
  const wizardData = useSelector(selectWizardData)

  const wordData = useSelector(selectWizardWords) || []
  const notUsedWords = wordData.filter((word)=>!word.categoryName)
  const [showList, setShowList] = useState(false)

  const lastCategory = categoryData.length > 0 ? categoryData[categoryData.length - 1]?.words.length < 10 ? categoryData[categoryData.length - 1] : null : null
  const [sumSelected, setSumSelected] = useState(lastCategory?.words?.length || 0)

  const categorySchema = z.object({
    name: z.string({ required_error: "Category name is required" })
      .nonempty("Category name must contain at least 1 character")
      .refine(
        (val) => {
          if (val === lastCategory?.name) 
            return true
          return !categoryData.some((cat) => cat.name === val)
        },
        { message: "Category name already exists" }
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
      const addWord = window.confirm("you can step to the next steps if you have at least 10 words in the category\n whould u like to move to add words")
      if (addWord)
        dispatch(goToStep(1))
      return
    }
    let addAnother =false
    if(!wizardData.categoryInfo)
    {
       addAnother = window.confirm("whould you like to add another category???")
    }
    reset({ words: [], name: "" })
    setSumSelected(0)
    if (!addAnother)
      dispatch(goToStep(step+1))
  }

  return (
    <div>
      {!showList ?

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex",flexDirection: "column",gap: 12,width: "100%",maxWidth: 480,margin: "0 auto",padding: 14,border: "1px solid #eee",borderRadius: 8,background: "#fff",boxShadow: "0 1px 4px rgba(16,24,40,0.04)",fontFamily:"system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",}}>
          
          <h1>Add Category</h1>

          <FormInput
            label="Category Name"
            type="text"
            register={register("name")}
            error={errors.name?.message}
            placeholder="Enter category name..."
            htmlFor="category"
          />

          <div>
            <label style={{ fontWeight: "bold" }}>Select Words <span>{sumSelected}</span></label>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 6 }}>
              {notUsedWords.length > 0 ? (
                wordData.map((word,i) => {

                  if (word.categoryName && word.categoryName !== lastCategory?.name) {
                    return null
                  }

                  const isChecked = lastCategory?.words?.includes(word.word)

                  return (
                    <label key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <input
                        type="checkbox"
                        value={word.word}
                        {...register("words")}
                        defaultChecked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSumSelected((prev) => prev + 1)
                          } else {
                            setSumSelected((prev) => prev - 1)
                          }
                        }}
                      />
                      {word.word}
                    </label>
                  )
                })
              ) : (
                <p style={{ fontSize: 14, color: "#666" }}>No words available yet.</p>
              )}

            </div>
          </div>

          <button type="submit" style={{ marginTop: 10 }}>
            save
          </button>

          <button type='button' onClick={() => setShowList(true)}>⬅️categories i added</button>

        </form>
        :
        <div style={{display: "flex",flexDirection: "column",gap: 12,width: "100%",maxWidth: 480,margin: "0 auto",padding: 14,border: "1px solid #eee",borderRadius: 8,background: "#fff",boxShadow: "0 1px 4px rgba(16,24,40,0.04)",fontFamily:"system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",}}>
          
          <h1>categories list</h1>
          {
            categoryData.map((category) => {
              return <div>
                <p>{category.name}</p>
                <p> words:{category.words.join(', ')}</p>

              </div>
            })
          }
          <button type='button' onClick={() => setShowList(false)}>⬅️add category</button>
        </div>
      }
    </div>
  )
}

export default AddCategoriesInfo