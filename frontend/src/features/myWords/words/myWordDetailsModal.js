import { FaStar } from "react-icons/fa";

const MyWordDetailsModal = ({ myWord, setShowModal }) => {
  const wordImg = myWord.word.img

  let imageSrc = ""
  if (wordImg?.data && wordImg?.contentType) {
    imageSrc =` data:image/${wordImg.contentType};base64,${wordImg.data}`;
  }

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0,
      width: "100%", height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.12)",
      display: "flex", justifyContent: "center", alignItems: "center"
    }}>
      <div style={{
        background: "white",
        padding: "20px",
        borderRadius: "8px",
        minWidth: "300px"
      }}>
        <button onClick={() => setShowModal(null)}>❌</button>

        <h2>{myWord.word.word}</h2>
        <p>Translation: {myWord.word.translation}</p>
        <p>Category: {myWord.word.categoryName}</p>

        <div>
          Rating:
          {[...Array(myWord.rateing)].map((_, i) => (
            <FaStar
              key={i}
              color="gold"
            />
          ))}
        </div>

        {imageSrc ? (
          <img
            src={imageSrc}
            alt={myWord.word.word}
            style={{ width: "100px", height: "100px", objectFit: "contain" }}
          />
        ) : (
          <p>לא נמצאה תמונה</p>
        )}
      </div>
    </div>
  )
}

export default MyWordDetailsModal