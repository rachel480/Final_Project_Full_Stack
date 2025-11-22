import { useEffect, useState } from "react"
import bufferToBase64 from "../../../../utils/imageUtils"

const HardOptionList = ({ options, status, answer, chooseAnswer }) => {
  const [positions, setPositions] = useState([])

  useEffect(() => {
    const generatePositions = () =>
      options.map(() => ({
        x: Math.random() * 240 - 120,
        y: Math.random() * 240 - 120
      }))
    setPositions(generatePositions())

    const interval = setInterval(() => {
      setPositions(generatePositions())
    }, 1000)

    return () => clearInterval(interval)
  }, [options])

  if (!options || options.length === 0) return null

  return (
    <div className="relative w-80 h-80 mt-8 max-md:w-64 max-md:h-64 max-md:mt-6">
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
            className={`absolute flex flex-col items-center p-2 rounded-xl shadow-md cursor-pointer 
              ${isSelected ? "bg-yellow-200 ring-4 ring-yellow-400 scale-105" : "bg-white hover:scale-105"} 
              transition-all duration-500 ease-in-out
              max-md:p-1`}
            style={{
              top: `calc(50% + ${pos.y}px)`,
              left: `calc(50% + ${pos.x}px)`,
              transform: "translate(-50%, -50%)"
            }}
          >
            {status === 0 ? (
              optionImageSrc ? (
                <img
                  src={optionImageSrc}
                  alt={option.word}
                  className="w-16 h-16 object-contain max-md:w-12 max-md:h-12"
                />
              ) : (
                <p className="text-gray-400 text-sm max-md:text-xs">אין תמונה</p>
              )
            ) : (
              <p className="font-semibold text-indigo-700 text-lg max-md:text-base">{option.word}</p>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default HardOptionList
