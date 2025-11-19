import { FaStar } from "react-icons/fa";
import speak from "../../../utils/speech";
import useMyWord from "./useMyWord";
import UpdateWordForm from "./updateWordForm";
import MyWordDetailsModal from "./myWordDetailsModal";
import UpdateButton from "../../../components/updateButton";
import DeleteButton from "../../../components/deleteButton";
import SoundButton from "../../../components/soundButton";
import { Box } from "@mui/material";
import { useState } from "react";
import SingleCard from "../common/singleCard";

const MyWordCard = ({ myWord }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const { handleDeleteMyWord, handleUpdateMyWordRaiting } = useMyWord();

  return (
    <>
      <SingleCard
        title={myWord.word.word}
        subtitle="לחץ להציג פרטי מילה"
        onClickTitle={() => setShowModal(myWord)}
        updateButton={<UpdateButton onClick={() => setShowUpdateForm(true)} />}
        deleteButton={<DeleteButton onClick={() => handleDeleteMyWord({ id: myWord._id })} />}
        extraContent={
          <>
            <SoundButton word={myWord.word.word} />
            <Box display="flex" justifyContent="center" mt={1} gap={0.5}>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  color={i < myWord.rateing ? "gold" : "lightgray"}
                  size={20}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    handleUpdateMyWordRaiting({
                      id: myWord._id,
                      rateing: i < myWord.rateing ? i : i + 1,
                    })
                  }
                />
              ))}
            </Box>
          </>
        }
      />

      {showUpdateForm && <UpdateWordForm setShowUpdateForm={setShowUpdateForm} myWord={myWord} />}
      {showModal && <MyWordDetailsModal myWord={showModal} setShowModal={setShowModal} />}
    </>
  );
};

export default MyWordCard;