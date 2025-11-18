import bufferToBase64 from "../../../../utils/imageUtils"

const MediumOptionList = ({ options, status, answer, chooseAnswer }) => {
  if (!options || options.length === 0) return null

  return (
    <div className="relative w-80 h-80 mt-8">
      {options.map((option, i) => {
        const angle = (360 / options.length) * i
        const x = 120 * Math.cos((angle * Math.PI) / 180)
        const y = 120 * Math.sin((angle * Math.PI) / 180)

        const isSelected = answer?.userAnswer === option.word

        let optionImageSrc = ""
        if (option.img?.data && option.img?.contentType) {
          const base64 = bufferToBase64(option.img.data.data)
          optionImageSrc = `data:image/${option.img.contentType};base64,${base64}`
        }

        return (
          <div
            key={i}
            onClick={() => chooseAnswer(option.word)}
            className={`
              absolute flex flex-col items-center p-2 rounded-xl shadow-md cursor-pointer 
              ${isSelected ? "bg-yellow-200 ring-4 ring-yellow-400 scale-105" : "bg-white hover:scale-105"}
            `}
            style={{
              top: `calc(50% + ${y}px)`,
              left: `calc(50% + ${x}px)`,
              transform: "translate(-50%, -50%)"
            }}
          >
            {status === 0 ? (
              optionImageSrc ? (
                <img src={optionImageSrc} alt={option.word}className="w-16 h-16 object-contain" />
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

export default MediumOptionList