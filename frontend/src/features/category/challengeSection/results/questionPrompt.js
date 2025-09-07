const  QuestionPrompt=({ question, status,styles}) =>{

  const questionImg = question?.question?.img
  const hasImg = questionImg?.data && questionImg?.contentType
  const src = hasImg ? `data:image/${questionImg.contentType};base64,${questionImg.data}` : ""

  if (status === 0) 
    return <div style={styles.prompt}><span style={{ fontSize: '18px' }}>{question?.question?.word}?</span></div>
  
  return (
    <div style={styles.prompt}>
      {src ? <img src={src} alt={question?.question?.word} style={styles.promptImg} /> : <span>לא נמצאה תמונה</span>}
    </div>
  )
}

export default QuestionPrompt