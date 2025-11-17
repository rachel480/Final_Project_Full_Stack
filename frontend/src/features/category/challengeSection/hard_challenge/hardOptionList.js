import { useEffect, useState } from "react"
import bufferToBase64 from "../../../../utils/imageUtils"

const HardOptionList = ({ options, status, answer, chooseAnswer }) => {
  const [positions, setPositions] = useState([])

  useEffect(() => {
    // יצירת מיקומים אקראיים בהתחלה
    const generatePositions = () => options.map(() => ({
      x: Math.random() * 240 - 120, // סביב מרכז המסך
      y: Math.random() * 240 - 120
    }))
    setPositions(generatePositions())

    const interval = setInterval(() => {
      setPositions(generatePositions())
    }, 1000) // עדכון כל שנייה

    return () => clearInterval(interval)
  }, [options])

  if (!options || options.length === 0) return null

  return (
    <div className="relative w-80 h-80 mt-8">
      {options.map((option, i) => {
        const isSelected = answer?.userAnswer === option.word

        let optionImageSrc = ""
        if (option.img?.data && option.img?.contentType) {
          const base64 = bufferToBase64(option.img.data.data)
          optionImageSrc = `data:image/${option.img.contentType};base64,${base64}`
        }

        const pos = positions[i] || { x: 0, y: 0 }

        return (
          <div
            key={i}
            onClick={() => chooseAnswer(option.word)}
            className={`
              absolute flex flex-col items-center p-2 rounded-xl shadow-md cursor-pointer 
              ${isSelected ? "bg-yellow-200 ring-4 ring-yellow-400 scale-105" : "bg-white hover:scale-105"}
              transition-all duration-500 ease-in-out
            `}
            style={{
              top: `calc(50% + ${pos.y}px)`,
              left: `calc(50% + ${pos.x}px)`,
              transform: "translate(-50%, -50%)"
            }}
          >
            {status === 0 ? (
              optionImageSrc ? (
                <img src={optionImageSrc} className="w-16 h-16 object-contain" />
              ) : (
                <p className="text-gray-400">אין תמונה</p>
              )
            ) : (
              <p className="font-semibold text-indigo-700">{option.word}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default HardOptionList