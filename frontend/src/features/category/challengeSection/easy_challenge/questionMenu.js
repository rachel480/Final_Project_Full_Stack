import { Button } from "@mui/material";

const QuestionMenu = ({ questions, setCurrentIndex }) => {
  return (
    <nav className="flex flex-wrap justify-center gap-2 mb-4 max-md:gap-1">
      {questions.map((question, index) => (
        <Button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`rounded-full w-10 h-10 max-md:w-8 max-md:h-8 ${
            question.answer.userAnswer
              ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm max-md:text-xs"
              : "bg-gray-200 text-gray-600 hover:bg-gray-300 text-sm max-md:text-xs"
          }`}
        >
          {index + 1}
        </Button>
      ))}
    </nav>
  )
}

export default QuestionMenu