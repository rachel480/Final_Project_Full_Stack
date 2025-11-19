import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const FileInput = ({ label = "תמונה", register, name }) => {
  const [preview, setPreview] = useState(null);

  const handlePreview = (fileList) => {
    if (fileList && fileList[0]) {
      const file = fileList[0]
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  useEffect(() => {
    return () => setPreview(null);
  }, []);

  return (
    <Box className="mt-4">
      <Typography sx={{ fontWeight: "bold", mb: 1 }}>{label}</Typography>
      <input
        type="file"
        accept="image/*"
        {...register(name)}
        onChange={(e) => handlePreview(e.target.files)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "2px solid rgba(229,145,42,0.62)",
          backgroundColor: "rgba(173, 216, 230, 0.2)",
        }}
      />
      {preview && (
        <Box className="mt-2 flex justify-center">
          <img
            src={preview}
            alt="preview"
            style={{
              width: "128px",
              height: "128px",
              objectFit: "contain",
              border: "2px solid rgba(229,145,42,0.62)",
              borderRadius: "8px",
              marginTop: "8px",
            }}
          />
        </Box>
      )}
    </Box>
  )
}

export default FileInput