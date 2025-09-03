import { useState } from "react"
import speak from "../../../utils/speech"
import useFavoriteWord from "../../favoriteWords/useFavoriteWordFavoriteWord"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
const WordCard = ({ word }) => {
    const { handleCreateFavoriteWord, message } = useFavoriteWord()
    const [showWord, setShowWord] = useState(true)
    const handleSpeak = () => {
        speak(word)
    }
    
        return <div> {showWord ?
            // front card
            <div style={{ width: "20vW", marginRight: "40vw", marginLeft: "40vw", height: "40vh", display: "flex", flexDirection: "column", backgroundColor: "red", borderColor: "black", borderStyle: "solid", marginBottom: "3%" }}>
                <div>{word.word}</div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <button onClick={handleSpeak} >🔊</button>
                    <button onClick={() => setShowWord(false)}>translation⬅️</button>
                    <button onClick={() => handleCreateFavoriteWord({ word:word._id })}>{word.isFavorite ? <AiFillHeart color="red" size={15} /> : <AiOutlineHeart color="white" size={15} />}</button>
                </div>
            </div>
            :
            // back card
            <div style={{ width: "20vW", marginRight: "40vw", marginLeft: "40vw", height: "40vh", display: "flex", flexDirection: "column", backgroundColor: "green", borderColor: "black", borderStyle: "solid", marginBottom: "3%" }}>
                <div>{word.translation}</div>
                <button onClick={() => setShowWord(true)}>English➡️</button>
            </div>}
        {message && <p style={{ color: message.type === "error" ? "red" : "green" }}>{message.text}</p>}
        
        </div>
    
}

export default WordCard