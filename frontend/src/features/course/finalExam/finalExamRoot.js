import { useState } from "react"
import { useParams } from "react-router-dom"
import PartA from "./partA"
import PartB from "./partB"
import FinalExamEndModal from "./finalExamEndModal"
import LoadingSpinner from "../../../components/loadingSpinner"
import ErrorMessage from "../../../components/errorMessage"
import { Button, Typography } from "@mui/material"
import { useGetCourseCategoriesQuery, useGetCourseWordsQuery } from "../courseApi"

const FinalExamRoot = () => {
  const { courseId } = useParams()
  const { data:words, isLoading, error } = useGetCourseWordsQuery(courseId)
  const { data: categories, isLoading: catLoading, error: catError } = useGetCourseCategoriesQuery(courseId)
  const [currentPart, setCurrentPart] = useState(0) 
  const [totalScore, setTotalScore] = useState(0)
  const [partScores, setPartScores] = useState({ partA: 0, partB: 0 })

  const handlePartEnd = (part, score) => {
    setPartScores(prev => ({ ...prev, [part]: score }))
    setTotalScore(prev => prev + score)
    setCurrentPart(prev => prev + 1)
  }

  if (isLoading || catLoading) return <LoadingSpinner/>
  if (error || catError) return <ErrorMessage message="שגיאה בטעינת הקורס או הקטגוריות"/>

  const startNextPart = () => setCurrentPart(prev => prev + 1)

  const renderPartIntro = () => {
    let title="", desc=""
    switch(currentPart) {
      case 0:
        title="חלק א: מציאת זוגות בלוח"
        desc="בכל סיבוב, חפש את הזוג הנכון למילה שמוצגת וצבור נקודות."
        break
      case 1:
        title="חלק ב: משחק זיכרון"
        desc="מצא את הזוגות בין מילה לתרגום. כל זוג נכון נותן נקודות."
        break
      default: return null
    }
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <Typography variant="h4" className="font-bold mb-2">{title}</Typography>
        <Typography variant="body1" className="mb-4 text-center">{desc}</Typography>
        <Button variant="contained" color="primary" onClick={startNextPart}>התחל</Button>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center pt-10">
      {currentPart === 0 && renderPartIntro()}
      {currentPart === 1 && <PartA categories={categories} allWords={words} onEnd={score => handlePartEnd("partA", score)}/>}
      {currentPart === 2 && <PartB categories={categories} allWords={words} onEnd={score => handlePartEnd("partB", score)}/>}
      {currentPart > 2 && 
        <FinalExamEndModal totalScore={totalScore} partScores={partScores} courseId={courseId}/>
      }
    </div>
  )
}

export default FinalExamRoot