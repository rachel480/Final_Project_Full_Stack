import bufferToBase64 from "../../../utils/imageUtils"
import OptionList from "./optionList"
import QuestionMenu from "./questionMenu"
const QuestionCard = ({ question, index,handleUsersAnswer,questions ,setCurrentIndex}) => {
    const questionImg = question.question.img

    let questionImageSrc = ""
    if (questionImg?.data && questionImg?.contentType) {
        const base64String = bufferToBase64(questionImg.data.data)
        questionImageSrc = `data:image/${questionImg.contentType};base64,${base64String}`
    }

    return (
        <div  style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
            <QuestionMenu questions={questions} setCurrentIndex={setCurrentIndex}/>
            <p>שאלה {index}</p>
            <div>
                {question.status === 0 ? (
                    <p>{question.question.word} ?</p>
                ) : (
                    questionImageSrc ? (
                        <img
                            src={questionImageSrc}
                            alt={question.question.word}
                            style={{ width: "100px", height: "100px", objectFit: "contain" }}
                        />
                    ) : (
                        <p>לא נמצאה תמונה</p>
                    )
                )}
            </div>
            <OptionList options={question.options} status={question.status} handleUsersAnswer={handleUsersAnswer} answer={question.answer}/>
        </div>
    )
}
export default QuestionCard