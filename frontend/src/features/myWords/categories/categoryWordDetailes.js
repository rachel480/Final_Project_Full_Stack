import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Card, CardContent, Typography, Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import UpdateWordForm from "../words/updateWordForm";
import useMyWord from "../words/useMyWord";

const CategoryWordDetailes = ({ word }) => {

    const arrayBufferToBase64 = (buffer) => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    };

    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const { handleDeleteMyWord } = useMyWord();
    const [hovered, setHovered] = useState(false);

    const wordImg = word.word.img || word.img;
    let imageSrc = "";
    if (wordImg?.data && wordImg?.contentType) {
        const base64Data = arrayBufferToBase64(wordImg.data.data || wordImg.data);
        imageSrc = `data:image/${wordImg.contentType};base64,${base64Data}`;
    }

    return (
        <Card
            className="w-72 mx-auto my-4 cursor-pointer"
            sx={{
                borderRadius: 3,
                background: hovered
                    ? "linear-gradient(to right, #a8e6cf, #56c596)"
                    : "linear-gradient(to right, #c1f0d1, #81d49c)",
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
            <CardContent className="flex flex-col items-center justify-center gap-2">

                <Typography variant="h6" className="font-bold text-gray-800 mb-1">
                    {word.word.word}
                </Typography>

                <Typography variant="body2" className="text-gray-700">
                    Translation: {word.word.translation}
                </Typography>

                <Typography variant="body2" className="text-gray-700">
                    Category: {word.word.categoryName}
                </Typography>

                <Box
                    className="flex gap-1 mt-2 p-1 rounded-lg border-2 border-transparent bg-yellow-100"
                    sx={{ borderColor: "#ffc107" }}
                >
                    {[...Array(5)].map((_, i) => (
                        <FaStar
                            key={i}
                            color={i < word.rateing ? "gold" : "lightgray"}
                        />
                    ))}
                </Box>

                {imageSrc ? (
                    <Box className="flex justify-center mt-5">
                        <img
                            src={imageSrc}
                            alt={word.word.word}
                            className="w-48 h-48 object-contain rounded-xl border border-gray-200 shadow-sm"
                        />
                    </Box>
                ) : (
                    <Typography
                        className="text-gray-400 italic text-center mt-5"
                        variant="body2"
                    >
                        לא נמצאה תמונה
                    </Typography>
                )}

                <Box className="flex items-center justify-center gap-2 mt-3">
                    <Tooltip title="עדכן מילה" arrow>
                        <IconButton
                            onClick={() => setShowUpdateForm(true)}
                            sx={{ bgcolor: "#ffb74d", "&:hover": { bgcolor: "#ffa726" }, color: "white" }}
                        >
                            <Edit />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="מחק מילה" arrow>
                        <IconButton
                            onClick={() => handleDeleteMyWord({ id: word._id })}
                            sx={{ bgcolor: "#ef5350", "&:hover": { bgcolor: "#e53935" }, color: "white" }}
                        >
                            <Delete />
                        </IconButton>
                    </Tooltip>
                </Box>
            </CardContent>

            {showUpdateForm && <UpdateWordForm setShowUpdateForm={setShowUpdateForm} myWord={word} />}
        </Card>
    );
};

export default CategoryWordDetailes;