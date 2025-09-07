import bufferToBase64 from "../../../utils/imageUtils"
const OptionList=({options,status,handleUsersAnswer,answer})=>{
    return (
        <div style={{ display: "flex", gap: "1rem" }}>
                {options.map((option, index) => {
                    const optionImg = option.img
                    let optionImageSrc = ""

                    if (optionImg?.data && optionImg?.contentType) {
                        const base64Option = bufferToBase64(optionImg.data.data)
                        optionImageSrc = `data:image/${optionImg.contentType};base64,${base64Option}`
                    }

                    return (
                        <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <p>{index + 1}</p>
                            {status === 0 ? (
                                optionImageSrc ? (
                                    <button onClick={()=>handleUsersAnswer(option.word)} style={{borderColor:answer.userAnswer === option.word && "blue" }}>
                                    <img
                                        src={optionImageSrc}
                                        alt={option.word}
                                        style={{ width: "80px", height: "80px", objectFit: "contain" }}
                                    /></button>
                                ) : (
                                    <p>אין תמונה</p>
                                )
                            ) : (
                                <button onClick={()=>handleUsersAnswer(option.word)} style={{borderColor:answer.userAnswer === option.word && "blue" }}>{option.word}</button>
                            )}
                        </div>
                    )
                })}
            </div>
    )
}
export default OptionList