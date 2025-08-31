import { FaStar } from "react-icons/fa";

const FavoriteWordDetailesModal = ({ favWord, setShowModal }) => {
    const wordImg = favWord.word.img

    let imageSrc = ""
    if (wordImg?.data && wordImg?.contentType) {
        imageSrc = `data:image/${wordImg.contentType};base64,${wordImg.data}`;
    }

    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.12)", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ background: "white", padding: "20px", borderRadius: "8px", minWidth: "300px" }}>
                <button onClick={() => setShowModal(null)}>❌</button>
                <h2>{favWord.word.word}</h2>
                <p>Translation: {favWord.word.translation}</p>
                <p>Category: {favWord.word.categoryName}</p>
                <div>
                    rateing:
                    {[...Array(favWord.rateing)].map((_, i) => (
                        <FaStar
                            key={i}
                            color="gold"
                        />
                    ))}
                </div>
                {imageSrc? (
                <img
                    src={imageSrc}
                    alt={favWord.word.word}
                    style={{ width: "100px", height: "100px", objectFit: "contain" }}
                />
                ) : (
                <p>לא נמצאה תמונה</p>
                )}
            </div>
        </div>
    )
}

export default FavoriteWordDetailesModal