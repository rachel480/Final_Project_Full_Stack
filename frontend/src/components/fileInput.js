import { Box, Typography } from "@mui/material";

const FileInput = ({ label = "תמונה", register, name,error }) => {

  const handlePreview = (fileList) => {
    if (fileList && fileList[0]) {
      const file = fileList[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
    }
  }


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
      <p className="text-red-600">{error}</p>
    </Box>
  )
}

export default FileInput