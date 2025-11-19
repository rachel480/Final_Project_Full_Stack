import { useState } from "react";
import FavoriteWordDetailesModal from "./favoriteWordDetailesModal";
import { Card, CardContent, Typography, Box, Tooltip } from "@mui/material";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify"
import DeleteButton from "../../components/deleteButton";
import SoundButton from "../../components/soundButton";

const FavoriteWordCard = ({ favWord, showModal, setShowModal, deleteFavoriteWord, updateFavoriteWordRaiting }) => {
    const [hovered, setHovered] = useState(false);

    const handleDelete = async (id) => {
        try {
            const res = await deleteFavoriteWord({ id }).unwrap()
            toast.success(res?.message || 'המילה נמחקה בהצלחה', {
                position: "top-right",
                autoClose: 3000,
            })
        } catch (err) {
            const errorMsg = err?.data?.message || err?.error || 'שגיאה לא ידועה';
            toast.error(errorMsg, {
                position: "top-right",
                autoClose: 4000
            })
        }
    }

    const handleUpdateRateing = async (id, rateing) => {
        try {
            const res = await updateFavoriteWordRaiting({ id, rateing }).unwrap();
            toast.success(res?.message || 'דירוג עודכן בהצלחה', {
                position: "top-right",
                autoClose: 3000,
            })
        } catch (err) {
            const errorMsg = err?.data?.message || err?.error || 'שגיאה לא ידועה';
            toast.error(errorMsg, {
                position: "top-right",
                autoClose: 4000
            })
        }
    }

    return (
        <>
            <Card
                className="w-80 mx-auto my-6 cursor-pointer"
                sx={{
                    borderRadius: 3,
                    background: hovered
                        ? "linear-gradient(to right, #fbc2eb, #a6c1ee)"
                        : "linear-gradient(to right, #83ff98ff, #d0f0c0)",
                    color: "#333",
                    textAlign: "center",
                    padding: 2,
                    boxShadow: 3,
                    transition: "0.3s",
                    "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <CardContent className="flex flex-col items-center justify-center">

                    <Tooltip title='לחץ כדי לצפות בפרטים נוספים' arrow>
                        <Box
                            onClick={() => setShowModal(favWord)}
                            className="cursor-pointer px-4 py-2 rounded-lg border-2 border-transparent hover:border-pink-500 transition-all duration-200 bg-gradient-to-r from-green-200 via-green-100 to-green-200 hover:from-pink-200 hover:via-pink-300 hover:to-pink-200"
                        >
                            <Typography
                                variant="h6"
                                className="font-bold text-gray-800 text-center hover:text-white transition-colors duration-200"
                            >
                                {favWord.word.word}
                            </Typography>
                        </Box>
                    </Tooltip>

                    <Box className="flex items-center justify-center gap-3 mt-4">

                        <SoundButton word={favWord.word.word} />
                        <DeleteButton onClick={() => handleDelete(favWord._id)} />

                        <Box
                            className="flex gap-1 items-center justify-center px-3 py-2 rounded-xl border-2 bg-[rgba(255,255,150,0.3)] border-[rgba(255,200,0,0.8)] shadow-md"
                        >
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    className="cursor-pointer"
                                    color={i < favWord.rateing ? "gold" : "lightgray"}
                                    onClick={() =>
                                        handleUpdateRateing(
                                            favWord._id,
                                            i < favWord.rateing ? i : i + 1
                                        )
                                    }
                                />
                            ))}
                        </Box>

                    </Box>
                </CardContent>
            </Card>

            {showModal && <FavoriteWordDetailesModal favWord={showModal} setShowModal={setShowModal} />}
        </>
    )
}

export default FavoriteWordCard