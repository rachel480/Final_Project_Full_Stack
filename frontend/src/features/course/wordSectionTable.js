import useFavoriteWord from "../favoriteWords/useFavoriteWordFavoriteWord"

const WordSectionTable = ({ words, handleSpeak }) => {
    const { handleCreateFavoriteWord, message } = useFavoriteWord()
    return (
        <div>
        <table id="wordTable" style={{ width: "80%", margin: "auto", borderCollapse: "collapse" }} >
            <thead>
                <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Index</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Word</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Translation</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Category</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {words.map((word, index) => (
                    <tr key={index}>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{index + 1}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{word.word}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{word.translation}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{word.categoryName}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>
                            <button onClick={() => handleSpeak(word.word)}>🔊</button>
                            <button onClick={()=>handleCreateFavoriteWord({word:word._id})}>💗</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {message && <p style={{ color: message.type === "error" ? "red" : "green" }}>{message.text}</p>}
        </div>)
}

export default WordSectionTable