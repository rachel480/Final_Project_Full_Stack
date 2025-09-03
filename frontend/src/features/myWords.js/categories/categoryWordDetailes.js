import { FaStar } from "react-icons/fa";
import UpdateWordForm from "../words/updateWordForm";
import { useState } from "react";
import useMyWord from "../words/useMyWord";

const CategoryWordDetailes = ({ word }) => {
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const { handleDeleteMyWord, message } = useMyWord()
    const wordImg = word.word.img

    let imageSrc = ""
    if (wordImg?.data && wordImg?.contentType) {
        imageSrc = `data:image/${wordImg.contentType};base64,${wordImg.data}`;
    }

    return (
        <div >
            <div style={{ background: "pink", padding: "20px", borderRadius: "8px", width: '20vw' }}>
                <h2>{word.word.word}</h2>
                <p>Translation: {word.word.translation}</p>
                <p>Category: {word.word.categoryName}</p>
                <div>
                    rateing:
                    {[...Array(word.rateing)].map((_, i) => (
                        <FaStar
                            key={i}
                            color="gold"
                        />
                    ))}
                </div>
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={word.word.word}
                        style={{ width: "100px", height: "100px", objectFit: "contain" }}
                    />
                ) : (
                    <p>לא נמצאה תמונה</p>
                )}
                <div>
                    <button onClick={() => handleDeleteMyWord({ id: word._id })}>🗑️</button>
                    <button onClick={() => setShowUpdateForm(true)}> ✏️</button>
                </div>
            </div>
            {message && (
                <div style={{ color: message.type === "error" ? "red" : "green" }}>
                    {message.text}
                </div>
            )}
            {showUpdateForm && <UpdateWordForm setShowUpdateForm={setShowUpdateForm} myWord={word} />}
        </div>

    )
}
export default CategoryWordDetailes