import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import AddWordForm from "./addWordForm"

const AddWordsInfo = ({ selectWizardWords, setWordInfo, goToStep, selectWizardStep }) => {
  const dispatch = useDispatch()
  const step = useSelector(selectWizardStep)
  const wordData = useSelector(selectWizardWords) || []
  const [showList, setShowList] = useState(false)

  const handleData = (data) => {
    dispatch(setWordInfo({ word: data.word, translation: data.translation, categoryName: "" }))
    const addAnother = window.confirm("whould you like to add another word???")
    if (!addAnother)
      dispatch(goToStep(step + 1))
  }

  return (
    <div>
      {!showList ?
        <div>
          <AddWordForm handleData={handleData} wordData={wordData}/>
          <button type='button' onClick={() => setShowList(true)}>➡️words i added</button>
        </div>
        :
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          width: "100%",
          maxWidth: 480,
          margin: "0 auto",
          padding: 14,
          border: "1px solid #eee",
          borderRadius: 8,
          background: "#fff",
          boxShadow: "0 1px 4px rgba(16,24,40,0.04)",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
        }}>
          <h1>words list</h1>
          {
            wordData.map((word) => {
              return <div>
                <p>word: {word.word}</p>
                <p>category: {word.categoryName ? word.categoryName : 'no category'}</p>
              </div>
            })
          }
          <button type='button' onClick={() => setShowList(false)}>⬅️add words</button>
        </div>
      }
    </div>
  )
}

export default AddWordsInfo