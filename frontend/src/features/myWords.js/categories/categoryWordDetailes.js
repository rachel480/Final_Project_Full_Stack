import { FaStar } from "react-icons/fa";

const CategoryWordDetailes=({ word})=>{
const wordImg = word.word.img

    let imageSrc = ""
    if (wordImg?.data && wordImg?.contentType) {
        imageSrc = `data:image/${wordImg.contentType};base64,${wordImg.data}`;
    }

    return (
        <div >
            <div style={{ background: "pink", padding: "20px", borderRadius: "8px", width:'20vw' }}>
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
                {imageSrc? (
                <img
                    src={imageSrc}
                    alt={word.word.word}
                    style={{ width: "100px", height: "100px", objectFit: "contain" }}
                />
                ) : (
                <p>לא נמצאה תמונה</p>
                )}
                <div>
                    <button>🗑️</button>
                    <button>✏️</button>
                </div>
            </div>
            
        </div>
    )
}
export default CategoryWordDetailes