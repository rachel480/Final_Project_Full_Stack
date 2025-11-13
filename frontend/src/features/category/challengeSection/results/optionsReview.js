
import bufferToBase64 from "../../../../utils/imageUtils"

const decorateOptionStyle = (base, { isCorrect, isWrongPick, isKidFriendly }) => {
  const style = { ...base }
  if (isKidFriendly) {
    style.borderRadius = '12px'
    style.fontWeight = 'bold'
    style.padding = '8px'
    style.cursor = 'default'
  }
  if (isCorrect) {
    style.borderColor = '#24a148'
    style.background = '#d4f7dc'
  }
  if (isWrongPick) {
    style.borderColor = '#da1e28'
    style.background = '#ffd6d6'
  }
  return style
}

const OptionsReview = ({ question, isKidFriendly }) => {
  const { options = [], correctAnswer, userAnswer } = question
  const userPick = userAnswer?.userAnswer

  return (
    <div className="flex flex-wrap gap-4 mt-4 justify-center">
      {options.map((option, i) => {
        const isCorrect = option?._id?.toString?.() === correctAnswer?._id?.toString?.() || option?.word === correctAnswer?.word
        const isUserPick = option?.word === userPick
        const isWrongPick = isUserPick && !isCorrect

        const baseStyle = {
          border: '2px solid transparent',
          background: '#fff',
          textAlign: 'center',
        }

        const btnStyle = decorateOptionStyle(baseStyle, { isCorrect, isWrongPick, isKidFriendly })

        const oImg = option?.img
        const hasImg = oImg?.data && oImg?.contentType
        const src = hasImg ? `data:image/${oImg.contentType};base64,${Array.isArray(oImg.data.data) ? bufferToBase64(oImg.data.data) : oImg.data}` : ""

        return (
          <button key={i} style={btnStyle} disabled className="flex flex-col items-center p-2 bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 shadow-lg rounded-2xl animate-fade-in transform hover:scale-105">
            {src ? <img src={src} alt={option?.word} className="w-20 h-20 object-contain rounded-lg shadow-md" /> : <span className="text-sm font-bold text-indigo-700">{option?.word}</span>}
            {!src && <span className="mt-1 text-indigo-700 font-bold">{option?.word}</span>}
          </button>
        )
      })}
    </div>
  )
}

export default OptionsReview
