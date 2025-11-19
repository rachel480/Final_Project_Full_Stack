import { FaStar } from "react-icons/fa";
import { Card, CardContent, Typography, Box, IconButton, Tooltip } from "@mui/material";
import { Close } from "@mui/icons-material";

const MyWordDetailsModal = ({ myWord, setShowModal }) => {
  const wordImg = myWord.word.img;

  let imageSrc = "";
  if (wordImg?.data && wordImg?.contentType) {
    imageSrc = `data:image/${wordImg.contentType};base64,${wordImg.data}`;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.12)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000
      }}
    >
      <Card
        sx={{
          width: 360,
          borderRadius: 3,
          background: "linear-gradient(to right, #fff59d, #ffeb3b)",
          boxShadow: 5,
          position: "relative",
          padding: 2,
          textAlign: "center",
        }}
      >

        <Tooltip title="סגור" arrow>
          <IconButton
            onClick={() => setShowModal(null)}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "#ef5350",
              color: "white",
              "&:hover": { bgcolor: "#e53935" },
            }}
          >
            <Close />
          </IconButton>
        </Tooltip>

        <CardContent className="flex flex-col items-center gap-2">
          <Typography variant="h5" fontWeight="bold">
            {myWord.word.word}
          </Typography>

          <Typography variant="body1" color="text.secondary">
            Translation: {myWord.word.translation}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Category: {myWord.word.categoryName}
          </Typography>

          <Box display="flex" justifyContent="center" mt={1} gap={0.5}>
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                color={i < myWord.rateing ? "gold" : "lightgray"}
                size={20}
              />
            ))}
          </Box>

          {imageSrc ? (
            <img
              src={imageSrc}
              alt={myWord.word.word}
              style={{ width: 120, height: 120, objectFit: "contain", marginTop: 8, borderRadius: 8 }}
            />
          ) : (
            <Typography variant="body2" color="text.secondary" mt={1}>
              לא נמצאה תמונה
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MyWordDetailsModal;