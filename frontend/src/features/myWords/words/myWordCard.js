import { FaStar } from "react-icons/fa";
import speak from "../../../utils/speech"
import useMyWord from "./useMyWord";
import { useState } from "react";
import UpdateWordForm from "./updateWordForm";
import MyWordDetailsModal from "./myWordDetailsModal";
const MyWordCard = ({ myWord }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const { handleUpdateMyWordRaiting, handleDeleteMyWord, message } = useMyWord()
  const [showModal, setShowModal] = useState(null)

  const handleSpeak = (word) => {
    speak(word)
  }


  return <div style={{ backgroundColor: 'pink', height: "10vh", width: '60vw', marginBottom: '1vh', marginLeft: '20vw' }}>
    <button onClick={() => { setShowModal(myWord) }}>{myWord.word.word}</button>
    <div style={{ display: 'flex' }}>
      <button style={{ backgroundColor: 'blue' }} onClick={() => handleSpeak(myWord.word.word)}>🔊</button>
      <button style={{ backgroundColor: 'red' }} onClick={() => handleDeleteMyWord({ id: myWord._id })}>🗑️</button>
      <button onClick={() => setShowUpdateForm(true)}> ✏️</button>
      <div style={{ display: "flex", backgroundColor: 'white' }}>
        {[...Array(5)].map((_, i) => (
          <FaStar
            onClick={(e) => { handleUpdateMyWordRaiting({ id: myWord._id, rateing: i < myWord.rateing ? i : i + 1 }) }}
            key={i}
            color={i < myWord.rateing ? "gold" : "lightgray"}
          />
        ))}
      </div>
    </div>
    {showUpdateForm && <UpdateWordForm setShowUpdateForm={setShowUpdateForm} myWord={myWord} />}
    {showModal && <MyWordDetailsModal myWord={showModal} setShowModal={setShowModal} />}

    {message && (
      <div style={{ color: message.type === "error" ? "red" : "green" }}>
        {message.text}
      </div>
    )}
  </div>
}
export default MyWordCard