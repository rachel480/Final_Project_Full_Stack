import bufferToBase64 from "../../../../utils/imageUtils";

const OptionList = ({ options, status, handleUsersAnswer, answer }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-4 max-md:gap-2">
      {options.map((option, index) => {
        let optionImageSrc = ""
        if (option.img?.data && option.img?.contentType) {
          const base64 = bufferToBase64(option.img.data.data)
          optionImageSrc = `data:image/${option.img.contentType};base64,${base64}`
        }

        const isSelected = answer.userAnswer === option.word

        return (
          <div
            key={index}
            onClick={() => handleUsersAnswer(option.word)}
            className={`
              flex flex-col items-center p-2 rounded-lg cursor-pointer
              transition-transform duration-200 transform
              ${isSelected ? "ring-4 ring-yellow-400 bg-yellow-50 scale-105" : "bg-white hover:scale-105"}
              max-md:w-24 max-md:p-1
            `}
          >
            <p className="mb-1 text-sm max-md:text-xs">{index + 1}</p>
            {status === 0 ? (
              optionImageSrc ? (
                <img
                  src={optionImageSrc}
                  alt={option.word}
                  className="w-20 h-20 object-contain rounded-md shadow-sm max-md:w-16 max-md:h-16"
                />
              ) : (
                <p className="text-gray-400 text-xs max-md:text-[10px]">אין תמונה</p>
              )
            ) : (
              <div className="px-4 py-2 font-semibold text-indigo-700 max-md:px-2 max-md:py-1 text-sm">{option.word}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default OptionList