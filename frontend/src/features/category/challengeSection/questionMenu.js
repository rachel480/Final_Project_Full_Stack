import { Button } from "@mui/material"

const QuestionMenu = ({ questions, setCurrentIndex }) => {
  return (
    <nav className="flex flex-wrap justify-center gap-2 mb-4">
      {questions.map((question, index) => (
        <Button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`rounded-full w-10 h-10 ${
            question.answer.userAnswer
              ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300"
          }`}
        >
          {index + 1}
        </Button>
      ))}
    </nav>
  )
}

export default QuestionMenu
