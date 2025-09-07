import bufferToBase64 from "../../../../utils/imageUtils"

//function that gives to each option his style acording to his status
const decorateOptionStyle = (base, {isCorrect, isWrongPick }) => {
    const style = { ...base }
    if (isCorrect) {
        style.borderColor = '#24a148' 
        style.background = '#ecfdf3'
    }
    if (isWrongPick) {
        style.borderColor = '#da1e28' 
        style.background = '#fff1f1'
    }
    return style
}

const OptionsReview = ({ question, styles }) => {
    const { options = [], correctAnswer, userAnswer, status } = question
    const userPick = userAnswer?.userAnswer

    return (
        <div style={styles.optionsRow}>
            {options.map((option, i) => {
                const isCorrect = option?._id?.toString?.() === correctAnswer?._id?.toString?.()
                    || option?.word === correctAnswer?.word
                const isUserPick = option?.word === userPick
                const isWrongPick = isUserPick && !isCorrect

                const btnStyle = decorateOptionStyle(styles.optionBtn, {isCorrect, isWrongPick })

                if (status === 0) {
                    const oImg = option?.img
                    const hasImg = oImg?.data && oImg?.contentType
                    const src = hasImg
                        ? `data:image/${oImg.contentType};base64,${Array.isArray(oImg.data.data) ? bufferToBase64(oImg.data.data) : oImg.data}`
                        : ""

                    return (
                        <button key={i} style={btnStyle} disabled>
                            {src ? <img src={src} alt={option?.word} style={styles.optionImg} /> : <span>אין תמונה</span>}
                            <div style={{ fontSize: '12px', marginTop: '4px' }}>{option?.word}</div>
                        </button>
                    )
                }

                return (
                    <button key={i} style={btnStyle} disabled>
                        {option?.word}
                    </button>
                )
            })}
        </div>
    )
}

export default OptionsReview